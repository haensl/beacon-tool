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

### Signal generation

#### `beaconTool.generate(format)`

Generates a payload for the given format.

#### <a name="formats"></a>Recognized Formats

* [`iBeacon`](https://developer.apple.com/ibeacon/): Generates a UUID.
* [`AltBeacon`](https://github.com/AltBeacon/spec): Generates a BeaconID.
* [`Eddystone UID`](https://github.com/google/eddystone/tree/master/eddystone-uid): Generates a a namespace-instanceID pair.

Beacon Tool tries to be smart about spelling, e.g. `Eddystone-UID`, `eddystoneuid` and `eddystone-UID` will all match Eddystone UID.

#### Example

```javascript
const beaconTool = require('beacon-tool');

const uuid = beaconTool.generate('iBeacon');
console.log(uuid);
```

### Signal validation

#### `beaconTool.validate(signal, format)`

Validates a signal payload against a given format.

See [Recognized Formats](#formats) for information on format specification.

#### Example

```javascript
const beaconTool = require('beacon-tool');

const isValidIBeacon = beaconTool.validate('259771A0-2DFB-4554-B817-2FBFDB5DB1A7', 'iBeacon');

if (isValidIBeacon) {
  console.info('valid');
} else {
  console.info('error');
}
```

## [Changelog](CHANGELOG.md)

## [License: MIT](LICENCSE)
