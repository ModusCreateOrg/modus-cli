#!/usr/bin/env node

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
    help:         'Set remote repo (org/repo/branch), defaults to ModusCrteateOrg/guidelines/master',
    defaultValue: 'ModusCreateOrg/guidelines/master'
  }
);
parser.addArgument(
  ['-d', '--dest'],
  {
    help:         'Set destination directory for files.  Defaults to .',
    defaultValue: '.'
  }
);
parser.addArgument(
  ['-o', '--overwrite'],
  {
    nargs:        0,
    help:         'Overwrite existing files from remote repository.  Otherwise, current files are renamed to .1, .2, .3....',
    defaultValue: false
  }
);

const args = parser.parseArgs(),
      {repo, overwrite, dest} = args,
      [org, path, branch] = repo.split('/');

console.log(args, repo, overwrite, org, path, branch);

const octokit = require('@octokit/rest')({
  headers: {
    accept:       'application/vnd.github.v3+json',
    'user-agent': 'octokit/rest.js v1.2.3',
  },
  baseUrl: 'https://api.github.com',
  agent:   undefined
});

const getTree = async() => {
  const o = {
    owner:     org, 
    repo:      path, 
    tree_sha:  branch, 
    recursive: 1
  };
  try {
    const data = await octokit.gitdata.getTree(o);
    return data.data.tree;
  }
  catch (e) {
    console.log(o);
    console.log('e', e);
    throw e;
  }
};

const wget = require('wget-improved'),
      fs = require('fs');

const safeFilename = async (filename) => {
  if (overwrite) {
    return filename;
  }
  return fs.existsSync(filename) ?  filename + '._modus_' : filename;
};

const main = async () => {
  try {
    const data = await getTree();
    for (const node of data) {
      //      console.log('path', node.path);
      if (node.type === 'tree') {
        const output = await safeFilename(dest + '/' + node.path);
        console.log('fs.mkdirSync(' + output + ', ' + node.mode + ');'); 
      }
    }
    for (const node of data) {
      //      console.log('path', node.path);
      if (node.type !== 'tree') {
        const output = await safeFilename(dest + '/' + node.path);
        console.log('wget(' + node.url + ',' + output + ');');
      }
    }
    //    console.log(data);
    
  }
  catch (e) {
    console.log('e', e);
  }
};

main();

