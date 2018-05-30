[![Modus CLI Tools](./images/modus.logo.svg)](https://moduscreate.com)

# Modus CLI Tools

[![MIT Licensed](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/your/your-project/blob/master/LICENSE)

Useful utility functions for working with high-profile applications and open source software.

## Installing

Download `modus` CLI from npm or yarn.

```shell
npm -g install modus
```

### Setting up Dev

This project is written in Node.js. It's recommended that you use it with Node 8.x+.

```shell
git clone git@github.com:ModusCreateOrg/modus-cli.git
cd modus-cli/
npm install
```

## Api Reference

### Guidelines
Add Modus guidlines repo files to current directory

```shell
modus guidelines
```

Usage: guidelines [options]

Add Modus guidlines repo files to current directory

Options:
* `-r, --repo <path>`  Set remote repo (org/repo/branch), defaults to ModusCrteateOrg/guidelines/master (default:ModusCreateOrg/guidelines/master)
* ` -d, --dest <dir>`   Set destination directory for files.  Defaults to . (default: .)
* `-s, --samples `     Include *.sample.* files from repo
* `-o, --overwrite`    Overwrite existing files from remote repository.  Otherwise, downloaded files that would overwrite are saved as filename._modus_.
* `-h, --help`        output usage information

## Modus Create

[Modus Create](https://moduscreate.com) is a digital product consultancy. We use a distributed team of the best talent in the world to offer a full suite of digital product design-build services; ranging from consumer facing apps, to digital migration, to agile development training, and business transformation.

[![Modus Create](./images/modus.logo.svg)](https://moduscreate.com)

## Licensing

State what the license is and how to find the text version of the license.

e.g. This project is [MIT licensed](./LICENSE).