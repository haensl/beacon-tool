#!/usr/bin/env node
const program = require('yargs');
const signal = require('./services/signal');

program
  .usage('Usage: $0 <command> [options]')
  .command({
    command: 'gen <format>',
    aliases: [
      'generate'
    ],
    desc: 'Generate a signal payload for the given format.',
    builder: () => {},
    handler: (argv) => {
      console.info(signal.generate(argv.format));
    }
  })
  .command({
    command: 'val <format> <payload>',
    aliases: [
      'validate'
    ],
    desc: 'Validate if a signal payload conforms to the given format.',
    builder: () => {},
    handler: (argv) => {
      if (signal.validate(argv.payload, argv.format)) {
        console.info('valid');
      } else {
        console.info('invalid');
      }
    }
  })
  .help('h')
  .completion()
  .argv;

