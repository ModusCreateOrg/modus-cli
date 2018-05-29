const path = require('path'), 
      fs = require('fs'),
      parser = require('../lib/ArgumentParser'),
      Downloader = require('../lib/Downloader'),
      GitHub = require('../lib/GitHub');

/* eslint-disable no-alert, no-console */

class Guidelines {
  constructor() {
    this.sampleRe = new RegExp('.*\.sample\..*');
    this.action = this.action.bind(this);
    parser.command(
      'guidelines', 
      'Add Modus guidlines repo files to current directory',
      {
        options: [
          {
            flags:       '-r, --repo <path>',
            description: 'Set remote repo (org/repo/branch), defaults to ModusCrteateOrg/guidelines/master',
            default:     'ModusCreateOrg/guidelines/master',
          },
          {
            flags:       '-d, --dest <dir>',
            description: 'Set destination directory for files.  Defaults to .',
            default:     '.',
          },
          {
            flags:       '-s, --samples',
            description: 'Include *.sample.* files from repo',
            default:     false,
          },
          {
            flags:       '-o, --overwrite',
            description: 'Overwrite existing files from remote repository.  Otherwise, downloaded files that would overwrite are saved as filename._modus_.',
            default:     false,
          },
        ],
        action: this.action
      });
  }

  async safeFilename(filename, overwrite) {
    if (overwrite) {
      this.stats.overwritten++;
      return filename;
    }
    if (fs.existsSync(filename)) {
      this.stats.conflicts++;
      return filename + '._modus_';
    }
    else {
      return filename;
    }
  }

  async action(args) {
    const {repo, overwrite, dest, samples} = args;

    this.stats = {
      overwritten: 0,
      conflicts:   0,
      downloads:   0,
      directories: 0,
    };

    try {
      const data = await GitHub.getTree(repo),
            re = this.sampleRe;

      for (const node of data) {
        if (re.test(node.path) && !samples) {
          continue;
        }
        if (node.type === 'tree') {
          const output = await this.safeFilename(path.join(dest, node.path), overwrite);
          this.stats.directories++;
          try {
            console.log('creating directory => ' + output);
            fs.mkdirSync(output, parseInt(node.mode, 8) | parseInt('755', 8)); 
          }
          catch (e) {
            // do nothing
          }
        }
      }
      for (const node of data) {
        if (re.test(node.path) && !samples) {
          continue;
        }
        if (node.type !== 'tree') {
          const output = await this.safeFilename(path.join(dest, node.path), overwrite);
          //          console.log('download(' + node.url + ',' + output + ');');
          const downloader = new Downloader(node.url, output, node.mode);
          await downloader.download();
          this.stats.downloads++;
        }
      }
    }
    catch (e) {
      console.log('e', e);
    }

    const stats = this.stats;
    console.log(`
      ${stats.overwritten} files overwritten
      ${stats.conflicts} file/directory conflicts
      ${stats.downloads} new files downloaded
      ${stats.directories} directories created
    `);
  }

}

module.exports = new Guidelines;

