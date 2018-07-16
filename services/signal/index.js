const rand = require('../../support/random');
const hexRegex = /^[a-f0-9]+$/i;

const signals = {
  altBeacon: {
    length: 40,
  },
  iBeacon: {
    length: 32
  },
  eddystoneUid: {
    length: 32,
    namespace: {
      length: 20
    },
    instanceId: {
      length: 12
    }
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

const generate = (format) => {
  let signal = '';

  while (signal.length < getLengthForFormat(format)) {
    signal = `${signal}${rand.randHex()}`;
  }

  return signal.toUpperCase();
};

const validate = (signal, format) => {
  const normalizedSignal = signal.replace(/-/g, '');
  return hexRegex.test(normalizedSignal)
    && normalizedSignal.length === getLengthForFormat(format);
};

module.exports = {
  generate,
  validate,
  signals
};

