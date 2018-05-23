class ArgumentsParser {
  constructor() {
    this.program = require('commander');
    this.program.version('0.0.1', '-v, --version');
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
    if (!this.parsed) {
      this.parsed = this.program.parse(process.argv);
    }
    return this.program;
  }
}

module.exports = new ArgumentsParser;
