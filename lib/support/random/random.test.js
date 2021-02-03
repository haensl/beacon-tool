const expect = require('chai').expect;
const rand = require('./');

describe('random', () => {
  describe('randInt()', () => {
    it('returns a number', () => {
      expect(typeof rand.randInt()).to.equal('number');
    });

    describe('min', () => {
      it('respects the minimum', () => {
        expect(rand.randInt(10)).to.be.least(10);
      });
    });

    describe('max', () => {
      let r;
      beforeEach(() => {
        r = rand.randInt(10, 11);
      });

      it('respects the minimum', () => {
        expect(r).to.be.least(10);
      });

      it('respects the maximum', () => {
        expect(r).to.be.below(11);
      });
    });
  });

  describe('randHex()', () => {
    it('returns a string', () => {
      expect(typeof rand.randHex()).to.equal('string');
    });

    it('returns a hexadecimal character', () => {
      expect(/^[0-f0-9]$/.test(rand.randHex())).to.be.true;
    });
  });
});
