const fs = require('fs'),
      http = require('https'),
      console = require('console');

class Downloader {
  constructor(src, dest, mode) {
    this.src = src;
    this.dest = dest;
    this.mode = mode || parseInt('644', 8);
    this.filesize = 0;
  }

  download() {
    console.log('downloading => ', this.dest);
    return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(this.dest),
            request = http.get(this.src, (res) => {
              res.pipe(file);
              file.on('finish', () => {
                file.close(() => {
                  fs.chmodSync(this.dest, this.mode);
                  resolve();
                });
              });
            });
      request.on('error', (err) => {
        reject(err);
      });
    });
  }
}

module.exports = Downloader;

