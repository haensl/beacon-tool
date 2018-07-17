const expect = require('chai').expect;
const signal = require('./');
const rand = require('../../support/random');

const hexRegex = /[a-f0-9]+/;
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const randString = (len) => {
  let str = '';
  while(str.length < len) {
    str = `${str}${alphabet[rand.randInt(0, alphabet.length - 1)]}`;
  }

  return str;
};

describe('Signal Service', () => {
  describe('generate()', () => {
    describe('iBeacon', () => {
      let uuid;

      beforeEach(() => {
        uuid = signal.generate('ibeacon');
      });

      it('generates a hex string', () => {
        expect(hexRegex.test(uuid)).to.be.true;
      });

      it('generates a string of 32 characters', () => {
        expect(uuid.length).to.equal(32);
      });

      describe('pretty', () => {
        beforeEach(() => {
          uuid = signal.generate('ibeacon', true);
        });

        it('generates a beautified iBeacon UUID', () => {
          expect(/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(uuid)).to.be.true;
        });
      });
    });

    describe('EddystoneUID', () => {
      let uuid;

      beforeEach(() => {
        uuid = signal.generate('eddystone-uid');
      });

      it('generates a hex string', () => {
        expect(hexRegex.test(uuid)).to.be.true;
      });

      it('generates a string of 32 characters', () => {
        expect(uuid.length).to.equal(32);
      });

      describe('pretty', () => {
        beforeEach(() => {
          uuid = signal.generate('eddystoneUid', true);
        });

        it('generates a beautified Eddystone UUID', () => {
          expect(/^[a-f0-9]{20}-[a-f0-9]{12}$/i.test(uuid)).to.be.true;
        });
      });
    });

    describe('AltBeacon', () => {
      let beaconId;

      beforeEach(() => {
        beaconId = signal.generate('altbeacon');
      });

      it('generates a hex string', () => {
        expect(hexRegex.test(beaconId)).to.be.true;
      });

      it('generates a string of 40 characters', () => {
        expect(beaconId.length).to.equal(40);
      });

      describe('pretty', () => {
        beforeEach(() => {
          beaconId = signal.generate('altbeacon', true);
        });

        it('generates a beautified AltBeacon BeaconId', () => {
          expect(/^[a-f0-9]{40}$/i.test(beaconId)).to.be.true;
        });
      });
    });

    describe('unknown format', () => {
      it('throws an error', () => {
        expect(() => signal.generate('foo')).to.throw;
      });
    });
  });

  describe('validate', () => {
    describe('iBeacon', () => {
      let uuid;

      describe('valid', () => {
        beforeEach(() => {
          uuid = signal.generate('ibeacon');
        });

        it('returns true', () => {
          expect(signal.validate(uuid, 'ibeacon')).to.be.true;
        });
      });

      describe('invalid', () => {
        describe('length', () => {
          beforeEach(() => {
            uuid = signal.generate('altbeacon');
          });

          it('returns false', () => {
            expect(signal.validate(uuid, 'ibeacon')).to.be.false;
          });
        });

        describe('charset', () => {
          beforeEach(() => {
            uuid = randString(signal.signals.iBeacon.length);
          });

          it('returns false', () => {
            expect(signal.validate(uuid, 'ibeacon')).to.be.false;
          });
        });
      });
    });

    describe('Eddystone-UID', () => {
      let uuid;

      describe('valid', () => {
        beforeEach(() => {
          uuid = signal.generate('eddystone-uid');
        });

        it('returns true', () => {
          expect(signal.validate(uuid, 'eddystone-uid')).to.be.true;
        });
      });

      describe('invalid', () => {
        describe('length', () => {
          beforeEach(() => {
            uuid = signal.generate('altbeacon');
          });

          it('returns false', () => {
            expect(signal.validate(uuid, 'eddystone-uid')).to.be.false;
          });
        });

        describe('charset', () => {
          beforeEach(() => {
            uuid = randString(signal.signals.iBeacon.length);
          });

          it('returns false', () => {
            expect(signal.validate(uuid, 'eddystone-uid')).to.be.false;
          });
        });
      });
    });

    describe('AltBeacon', () => {
      let beaconId;
      describe('valid', () => {
        beforeEach(() => {
          beaconId = signal.generate('altbeacon');
        });

        it('returns true', () => {
          expect(signal.validate(beaconId, 'altbeacon')).to.be.true;
        });
      });

      describe('invalid', () => {
        describe('length', () => {
          beforeEach(() => {
            beaconId = signal.generate('ibeacon');
          });

          it('returns false', () => {
            expect(signal.validate(beaconId, 'altbeacon')).to.be.false;
          });
        });

        describe('charset', () => {
          beforeEach(() => {
            beaconId = randString(signal.signals.iBeacon.length);
          });

          it('returns false', () => {
            expect(signal.validate(beaconId, 'altbeacon')).to.be.false;
          });
        });
      });
    });
  });
});
