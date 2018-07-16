#!/usr/bin/env node
const program = require('yargs');
const signals = require('./signals');

program.command('gen <format>', 'Generate a signal payload for the given format.', () => {},
  (argv) => {
    switch (argv.format.toLowerCase()) {
      case 'ibeacon':
        console.info(signals.generateiBeaconUUID());
        break;
      case 'altbeacon':
        console.info(signals.generateAltBeaconId());
        break;
      case 'eddystone-uid':
        console.info(signals.generateEddystoneUid());
        break;
      default:
        console.error(`Unknown format ${argv.format}`);
        break;
    }
  })
  .help()
  .completion()
  .argv;

