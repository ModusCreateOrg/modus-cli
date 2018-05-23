const path = require('path'), 
      fs = require('fs'),
      parser = require('../lib/ArgumentParser'),
      Downloader = require('../lib/Downloader'),
      GitHub = require('../lib/GitHub');

/* eslint-disable no-alert, no-console */
const safeFilename = async (filename, overwrite) => {
  if (overwrite) {
    return filename;
  }
  return fs.existsSync(filename) ?  filename + '._modus_' : filename;
};

class Guidelines {
  constructor() {
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
            flags:       '-o, --overwrite',
            description: 'Overwrite existing files from remote repository.  Otherwise, downloaded files that would overwrite are saved as filename._modus_.',
            default:     false,
          },
        ],
        action: this.action
      });
  }

  async action(args) {
    const {repo, overwrite, dest} = args;

    try {
      const data = await GitHub.getTree(repo);
      for (const node of data) {
        if (node.type === 'tree') {
          const output = await safeFilename(path.join(dest, node.path), overwrite);
          console.log('fs.mkdirSync(' + output + ', ' + node.mode + ');'); 
        }
      }
      for (const node of data) {
        //      console.log('path', node.path);
        if (node.type !== 'tree') {
          const output = await safeFilename(path.join(dest, node.path), overwrite);
          console.log('wget(' + node.url + ',' + output + ');');
        }
      }
    }
    catch (e) {
      console.log('e', e);
    }
  }
}

module.exports = new Guidelines;

