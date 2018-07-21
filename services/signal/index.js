const rand = require('../../support/random');
const hexRegex = /^[a-f0-9]+$/i;
const hexAndDashesRegex = /^[a-f0-9-]+$/i;

const signals = {
  altBeacon: {
    displayName: 'AltBeacon',
    key: 'altbeacon',
    length: 40,
    regex: /^[a-f0-9]{40}$/i
  },
  iBeacon: {
    dashes: [8, 12, 16, 20],
    displayName: 'iBeacon',
    key: 'ibeacon',
    length: 32,
    regex: /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i
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
    },
    regex: /^[a-f0-9]{12}-[a-f0-9]{20}$/i
  }
};

const getLengthForFormat = (format) => {
  let length;
  switch (format.toLowerCase()) {
    case signals.iBeacon.key:
      length = signals.iBeacon.length;
      break;
    case signals.altBeacon.key:
      length = signals.altBeacon.length;
      break;
    case signals.eddystoneUid.key:
      length = signals.eddystoneUid.namespace.length
        + signals.eddystoneUid.instanceId.length;
      break;
    default:
      throw new Error(`Unknown format: ${format}`);
  }

  return length;
};

const beautify = (payload, format) => {
  let beautifiedPayload = `${payload}`;
  let dashes = [];
  switch (format.toLowerCase()) {
    case signals.iBeacon.key:
      dashes = dashes.concat(signals.iBeacon.dashes);
      break;
    case signals.altBeacon.key:
      break;
    case signals.eddystoneUid.key:
      dashes = dashes.concat(signals.eddystoneUid.dashes);
      break;
    default:
      throw new Error(`Unknown format: ${format}`);
  }

  if (dashes.length) {
    beautifiedPayload = dashes.reduce((slices, dashIndex, i, dashes) => {
      slices.push(beautifiedPayload.slice(dashes[i-1] || 0, dashIndex));
      return slices;
    }, []).concat([ beautifiedPayload.slice(dashes[dashes.length -1 ])]).join('-');
  }

  return beautifiedPayload;
};

const generate = (format, pretty = false) => {
  let payload = '';

  while (payload.length < getLengthForFormat(format)) {
    payload = `${payload}${rand.randHex()}`;
  }

  if (pretty) {
    return beautify(payload, format);
  }

  return payload.toUpperCase();
};

const validate = (payload, format) => {
  const normalizedPayload = payload.replace(/-/g, '');
  return hexRegex.test(normalizedPayload)
    && normalizedPayload.length === getLengthForFormat(format);
};

const identify = (payload) => {
  if (!hexAndDashesRegex.test(payload)) {
    return [];
  }

  const knownSignals = [
    signals.iBeacon,
    signals.altBeacon,
    signals.eddystoneUid
  ];
  let candidates;

  if (/-/.test(payload)) {
    candidates = knownSignals.filter((signal) => signal.regex.test(payload));
  } else {
    candidates = knownSignals.filter((signal) => signal.length === payload.length);
  }

  return candidates.map((signal) => signal.key);
};

const get = (format) => {
  switch (format) {
    case signals.iBeacon.key:
      return signals.iBeacon;
    case signals.altBeacon.key:
      return signals.altBeacon;
    case signals.eddystoneUid.key:
      return signals.eddystoneUid;
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

module.exports = {
  beautify,
  generate,
  get,
  identify,
  signals,
  validate
};

