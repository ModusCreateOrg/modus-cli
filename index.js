#!/usr/bin/env node

/**
 * modus-cli
 *
 * Revision
 * 0.0.1 - Copy files from github://ModusCreateOrg/guidelines to current
 *         directory.
 */

/* eslint-disable no-alert, no-console */

const fs = require('fs'),
      path = require('path'),
      pluginDir = path.join(__dirname, 'plugins'),
      files = fs.readdirSync(pluginDir),
      parser = require('./lib/ArgumentParser'),
      plugins = [];


for (const file of files) {
  const p = path.join(pluginDir, file);
  plugins.push(require(p));
}
parser.parse();
/* eslint-enable no-alert */
