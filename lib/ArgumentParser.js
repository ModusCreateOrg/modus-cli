/**
 * ArgumentsParser
 *
 * This class manages parsing of command line arguments and the interface for
 * plugins to add themselves for parsing and generation of help text.
 */
class ArgumentsParser {
  constructor() {
    this.program = require("commander");
    this.program.version("0.0.1", "-v, --version");
    this.parsed = null;
  }

  command(name, description, opts) {
    const command = this.program.command(name);
    command.description(description);
    for (const option of opts.options) {
      command.option(option.flags, option.description, option.default);
    }
    command.action(opts.action);
  }

  parse() {
    if (!process.argv.slice(2).length) {
      this.program.outputHelp();
      process.exit(1);
    }
    if (!this.parsed) {
      this.parsed = this.program.parse(process.argv);
    }
    return this.program;
  }
}

module.exports = new ArgumentsParser();
