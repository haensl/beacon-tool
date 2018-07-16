# Beacon Tool
Collection of bluetooth beaconing tools.

## Features

Beacon Tool allows you to generate and validate various bluetooth beacon signals.

## Installation

Via NPM:

`npm i [-g] beacon-tool`

Via Yarn:

`yarn [global] add beacon-tool`

## Usage

### Synopsis

```bash
bt <command> [options]

Commands:
  bt gen <format>           Generate a signal payload for the given format.
                                                             [aliases: generate]
  bt val <format> <payload>  Validate if a signal conforms to the given format.
                                                             [aliases: validate]
  bt completion             generate bash completion script

Options:
  --version  Show version number                                       [boolean]
  -h         Show help                                                 [boolean]
```

### Signal generation

#### `bt gen <format>`

Generates a payload for the given format.

#### <a name="formats"></a>Recognized Formats

* [`iBeacon`](https://developer.apple.com/ibeacon/): Generates a UUID.
* [`AltBeacon`](https://github.com/AltBeacon/spec): Generates a BeaconID.
* [`Eddystone UID`](https://github.com/google/eddystone/tree/master/eddystone-uid): Generates a a namespace-instanceID pair.

Beacon Tool tries to be smart about spelling, e.g. `Eddystone-UID`, `eddystoneuid` and `eddystone-UID` will all match Eddystone UID.

#### Example

`bt gen iBeacon`

### Signal validation

#### `bt val <format> <payload>`

Validates a signal payload against a given format.

See [Recognized Formats](#formats) for information on format specification.

#### Example

`bt val iBeacon C8011DA4-47BE-4581-847E-C549A0E5E074`

## [Changelog](CHANGELOG.md)

## [License: MIT](LICENCSE)
