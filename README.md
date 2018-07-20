# Beacon Tool
Collection of bluetooth beacon signal utility functions.

[![NPM](https://nodei.co/npm/beacon-tool.png?downloads=true)](https://nodei.co/npm/beacon-tool/)

[![Build Status](https://travis-ci.org/haensl/beacon-tool.svg?branch=master)](https://travis-ci.org/haensl/beacon-tool)

## Features

Beacon Tool allows you to generate, inspect and validate various bluetooth beacon payloads.

## Installation

Via NPM:

`npm i [-g] beacon-tool`

Via Yarn:

`yarn [global] add beacon-tool`

## Usage

### Payload generation

#### `beaconTool.generate(format, [pretty])`

Generates a payload for the given format.

##### `(string, [boolean]) => string`

##### <a name="formats"></a>format `string`

The format to generate.

###### Recognized formats:

* `'ibeacon'`: Generates an ['iBeacon'](https://developer.apple.com/ibeacon/) UUID.
* `'altbeacon'`: Generates an [AltBeacon](https://github.com/AltBeacon/spec) BeaconID.
* `'eddystoneuid'`: Generates an [Eddystone](https://github.com/google/eddystone/tree/master/eddystone-uid) namespace-instance ID pair.

These strings are exposed as constants in [`beaconTool.signals`](#signals).

##### pretty `boolean` *optional*

###### Default: `false`

Whether or not to to add dashes to the returned payload string.

See [`beatify()`](#beatify) for further information.

##### Returns `string`

A payload string for the given result.

#### Example

```javascript
const beaconTool = require('beacon-tool');

const uuid = beaconTool.generate(beaconTool.signals.iBeacon.key);
console.log(uuid);
// de93f975b5d74c9ea8a606fd7cf9d45b

const prettyUUID = beaconTool.generate(beaconTool.signals.iBeacon.key);
console.log(prettyUUID);
// de93f975-b5d7-4c9e-a8a6-06fd7cf9d45b
```

### Payload validation

#### `beaconTool.validate(payload, format)`

Validates a signal payload against a given format.

##### `(string, string) => boolean`

##### payload `string`

The payload to validate.

##### format `string`

The format to generate.

See [Recognized Formats](#formats) for information on format specification.

##### Returns `boolean`

Whether or not the given payload is valid for the given format.

#### Example

```javascript
const beaconTool = require('beacon-tool');

const isValidIBeacon = beaconTool.validate(
  '259771A0-2DFB-4554-B817-2FBFDB5DB1A7',
  beaconTool.signals.iBeacon.key
);

if (isValidIBeacon) {
  console.info('valid');
} else {
  console.info('error');
}
```

### Payload beautifier

#### <a name="#beautify"></a>`beaconTool.beautify(payload, format)`

Beautifies, i.e. adds dashes, to a given payload. `beautify()` returns a new string.

*AltBeacon specification does not specify any representation of it's beacon id with dashes, therefore beautifying an AltBeacon payload will not have any effect.*

##### `(string, string) => string`

##### payload `string`

The payload to beatify.

##### format `string`

The payload format.

See [Recognized Formats](#formats) for information on format specification.

##### Returns `string`

The beatified payload.

#### Example

```javascript
const beaconTool = require('beacon-tool');

const beautifiedPayload = beaconTool.beatify(
  'DE93F975B5D74C9EA8A606FD7CF9D45B',
  beaconTool.signals.iBeacon.key
);

console.log(beatifiedPayload);
// DE93F975-B5D7-4C9E-A8A6-06FD7CF9D45B
```

### Payload identification

#### `beaconTool.identify(payload)`

Tries to identify a given payload.

##### `(string) => array`

##### Example

```javascript
const beaconTool = require('beacon-tool');
const candidates = beaconTool.identify('DE93F975-B5D7-4C9E-A8A6-06FD7CF9D45B');

candidates.forEach((candidate) => {
  console.info(`${beaconTool.get(candidate).displayName}`);
});
// iBeacon
```

##### payload `string`

The payload to identify.

##### Returns `array`

An array of potential candidates. The returned array contains the [`keys`](#signals) of potential candiate formats.

### Payload information

#### `beaconTool.get(format)`

Retrieves information about a given format.

##### `(string) => object`

##### format `string`

The format to retrieve information for.

See [Recognized Formats](#formats) for information on format specification.

##### Returns `object`

A signal information object.

See [signals](#signals) for futher information.

##### Example

```javascript
const beaconTool = require('beacon-tool');
console.log(beaconTool.get('ibeacon'));
/**
{
  dashes: [8, 12, 16, 20],
  displayName: 'iBeacon',
  key: 'ibeacon',
  length: 32
}
*/
```

#### <a name="signals"></a>`beaconTool.signals`

Beacon signal constants.

```javascript
const beaconTool = require('beacon-tool');

console.log(beaconTool.signals);
/**
{
  altBeacon: {
    displayName: 'AltBeacon',
    key: 'altbeacon',
    length: 40
  },
  iBeacon: {
    dashes: [8, 12, 16, 20],
    displayName: 'iBeacon',
    key: 'ibeacon',
    length: 32
  },
  eddystoneUid: {
    dashes: [20],
    displayName: 'Eddystone UID',
    instanceId: {
      length: 12
    },
    key: 'eddystoneuid',
    length: 32,
    namespace: {
      length: 20
    }
  }
}
*/
```

## [Changelog](CHANGELOG.md)

## [License: MIT](LICENCSE)
