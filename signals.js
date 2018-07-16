const hexAlphabet = 'abcdef0123456789'.split('');
const randInt = (min, max) =>
  Math.floor(Math.random() * (Math.floor(max) - Math.floor(min))) + min;
const randHex = () =>
  hexAlphabet[randInt(0, hexAlphabet.length - 1)];

const generateAltBeaconId = () => {
  let beaconId = '';
  let len = 40;
  while (len--) {
    beaconId = `${beaconId}${randHex()}`;
  }

  return beaconId;
};

const generateEddystoneUid = () => {
  let namespace = '';
  let instanceId = '';
  let namespaceLen = 20;
  let instanceIdLen = 12;
  while (namespaceLen--) {
    namespace = `${namespace}${randHex()}`;
  }

  while (instanceIdLen--) {
    instanceId = `${instanceId}${randHex()}`;
  }

  return `${namespace}${instanceId}`;
};

const generateiBeaconUUID = () => {
  let uuid = '';
  let len = 32;
  while (len--) {
    uuid = `${uuid}${randHex()}`;
  }

  return uuid;
};

module.exports = {
  generateiBeaconUUID,
  generateEddystoneUid,
  generateAltBeaconId
};

