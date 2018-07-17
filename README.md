# Beacon Tool
Collection of bluetooth beaconing tools.

## Features

Beacon Tool allows you to generate and validate various bluetooth beacon payloads.

## Installation

Via NPM:

`npm i [-g] beacon-tool`

Via Yarn:

`yarn [global] add beacon-tool`

## Usage

### Payload generation

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

### Payload validation

#### `beaconTool.validate(payload, format)`

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

### Payload beautifier

#### `beaconTool.beautifyPayload(payload, format)`

Beautifies, i.e. adds dashes, to a given payload as specified for the given format. `beautifyPayload()` returns a new string.

*AltBeacon specification does not specify any representation of it's beacon id with dashes, therefore beautifying an AltBeacon payload will not have any effect.*

See [Recognized Formats](#formats) for information on format specification.

#### Example

```javascript
const beaconTool = require('beacon-tool');

const beautifiedPayload = beaconTool.beatifyPayload('259771A02DFB4554B8172FBFDB5DB1A7', 'iBeacon');

console.log(beatifiedPayload);
```

## [Changelog](CHANGELOG.md)

## [License: MIT](LICENCSE)
