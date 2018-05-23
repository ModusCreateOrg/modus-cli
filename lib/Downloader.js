const wget = require('wget-improved'),
      fs = require('fs'),
      console = require('console');

class Downloader {
  constructor(src, dest, mode) {
    this.src = src;
    this.dest = dest;
    this.mode = mode || parseInt('0644', 8);
    this.filesize = 0;
  }

  download() {
    return new Promise((resolve, reject) => {
      const download = wget.download(this.src, this.dest);
      download.on('start', (filesize) => {
        this.filesize = filesize;
      });
      download.on('end', () => {
        fs.chmodSync(this.dest, this.mode);
        resolve(true);
      });
      download.on('error', (e) => {
        reject(e);
      });
      
      download.on('progress', (progress) => {
        if (this.filesize) {
          console.log('\rDetermining download progress...');
        }
        else {
          console.log(progress, progress/this.filesize);
        }
      });
    });
  }
}

module.exports = Downloader;

