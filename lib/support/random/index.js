const hexAlphabet = 'abcdef0123456789'.split('');

const randInt = (min = 0, max = Infinity) =>
  Math.floor(Math.random() * (Math.floor(max) - Math.floor(min))) + min;

const randHex = () =>
  hexAlphabet[randInt(0, hexAlphabet.length - 1)];

module.exports = {
  randInt,
  randHex
};
