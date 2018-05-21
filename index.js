/**
 * modus-cli
 *
 * Revision
 * 0.0.1 - Copy files from github://ModusCreateOrg/guidelines to current
 *         directory.
 */

const ArgumentParser = require('argparse').ArgumentParser,
      parser = new ArgumentParser({
        version:     '0.0.1',
        addHelp:     true,
        description: 'Modus CLI Tool',
      });

parser.addArgument(
  ['-r', '--repo'],
  {
    help: 'Set remote repo (org/repo), defaults to ModusCrteateOrg/guidelines'
  }
);
parser.addArgument(
  ['-o', '--overwrite'],
  {
    nargs: 0,
    help:  'Overwrite existing files from remote repository.  Otherwise, current files are renamed to .1, .2, .3....'
  }
);

const args = parser.parseArgs();
console.dir(args);
