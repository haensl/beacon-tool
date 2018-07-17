const rand = require('../../support/random');
const hexRegex = /^[a-f0-9]+$/i;

const signals = {
  altBeacon: {
    length: 40
  },
  iBeacon: {
    length: 32,
    dashes: [8, 12, 16, 20]
  },
  eddystoneUid: {
    length: 32,
    namespace: {
      length: 20
    },
    instanceId: {
      length: 12
    },
    dashes: [20]
  }
};

const getLengthForFormat = (format) => {
  let length;
  switch (format.toLowerCase()) {
    case 'ibeacon':
      length = signals.iBeacon.length;
      break;
    case 'altbeacon':
      length = signals.altBeacon.length;
      break;
    case 'eddystone-uid':
    case 'eddystoneuid':
      length = signals.eddystoneUid.namespace.length
        + signals.eddystoneUid.instanceId.length;
      break;
    default:
      throw new Error(`Unknown format: ${format}`);
  }

  return length;
};

const beautifyPayload = (payload, format) => {
  if (!validate(payload, format)) {
    throw new Error(`Invalid payload/format: ${payload} is not a valid ${format} payload!`);
  }

  let beautifiedPayload = `${payload}`;
  let dashes = [];
  switch (format.toLowerCase()) {
    case 'ibeacon':
      dashes = dashes.concat(signals.iBeacon.dashes);
      break;
    case 'altbeacon':
      break;
    case 'eddystone-uid':
    case 'eddystoneuid':
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
    return beautifyPayload(payload.toUpperCase(), format);
  }

  return payload.toUpperCase();
};

const validate = (payload, format) => {
  const normalizedPayload = payload.replace(/-/g, '');
  return hexRegex.test(normalizedPayload)
    && normalizedPayload.length === getLengthForFormat(format);
};

module.exports = {
  beautifyPayload,
  generate,
  validate,
  signals
};

