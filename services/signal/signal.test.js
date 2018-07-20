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
        uuid = signal.generate(signal.signals.iBeacon.key);
      });

      it('generates a hex string', () => {
        expect(hexRegex.test(uuid)).to.be.true;
      });

      it('generates a string of 32 characters', () => {
        expect(uuid.length).to.equal(32);
      });

      describe('pretty', () => {
        beforeEach(() => {
          uuid = signal.generate(signal.signals.iBeacon.key, true);
        });

        it('generates a beautified iBeacon UUID', () => {
          expect(/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(uuid)).to.be.true;
        });
      });
    });

    describe('EddystoneUID', () => {
      let uuid;

      beforeEach(() => {
        uuid = signal.generate(signal.signals.eddystoneUid.key);
      });

      it('generates a hex string', () => {
        expect(hexRegex.test(uuid)).to.be.true;
      });

      it('generates a string of 32 characters', () => {
        expect(uuid.length).to.equal(32);
      });

      describe('pretty', () => {
        beforeEach(() => {
          uuid = signal.generate(signal.signals.eddystoneUid.key, true);
        });

        it('generates a beautified Eddystone UUID', () => {
          expect(/^[a-f0-9]{20}-[a-f0-9]{12}$/i.test(uuid)).to.be.true;
        });
      });
    });

    describe('AltBeacon', () => {
      let beaconId;

      beforeEach(() => {
        beaconId = signal.generate(signal.signals.altBeacon.key);
      });

      it('generates a hex string', () => {
        expect(hexRegex.test(beaconId)).to.be.true;
      });

      it('generates a string of 40 characters', () => {
        expect(beaconId.length).to.equal(40);
      });

      describe('pretty', () => {
        beforeEach(() => {
          beaconId = signal.generate(signal.signals.altBeacon.key, true);
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
        describe('not pretty', () => {
          beforeEach(() => {
            uuid = signal.generate(signal.signals.iBeacon.key);
          });

          it('returns true', () => {
            expect(signal.validate(uuid, signal.signals.iBeacon.key)).to.be.true;
          });
        });

        describe('pretty', () => {
          beforeEach(() => {
            uuid = signal.generate(signal.signals.iBeacon.key, true);
          });

          it('returns true', () => {
            expect(signal.validate(uuid, signal.signals.iBeacon.key)).to.be.true;
          });
        });
      });

      describe('invalid', () => {
        describe('length', () => {
          beforeEach(() => {
            uuid = signal.generate(signal.signals.altBeacon.key);
          });

          it('returns false', () => {
            expect(signal.validate(uuid, signal.signals.iBeacon.key)).to.be.false;
          });
        });

        describe('charset', () => {
          beforeEach(() => {
            uuid = randString(signal.signals.iBeacon.length);
          });

          it('returns false', () => {
            expect(signal.validate(uuid, signal.signals.iBeacon.key)).to.be.false;
          });
        });
      });
    });

    describe('Eddystone-UID', () => {
      let uuid;

      describe('valid', () => {
        describe('not pretty', () => {
          beforeEach(() => {
            uuid = signal.generate(signal.signals.eddystoneUid.key);
          });

          it('returns true', () => {
            expect(signal.validate(uuid, signal.signals.eddystoneUid.key)).to.be.true;
          });
        });

        describe('pretty', () => {
          beforeEach(() => {
            uuid = signal.generate(signal.signals.eddystoneUid.key, true);
          });

          it('returns true', () => {
            expect(signal.validate(uuid, signal.signals.eddystoneUid.key)).to.be.true;
          });
        });
      });

      describe('invalid', () => {
        describe('length', () => {
          beforeEach(() => {
            uuid = signal.generate(signal.signals.altBeacon.key);
          });

          it('returns false', () => {
            expect(signal.validate(uuid, signal.signals.eddystoneUid.key)).to.be.false;
          });
        });

        describe('charset', () => {
          beforeEach(() => {
            uuid = randString(signal.signals.iBeacon.length);
          });

          it('returns false', () => {
            expect(signal.validate(uuid, signal.signals.eddystoneUid.key)).to.be.false;
          });
        });
      });
    });

    describe('AltBeacon', () => {
      let beaconId;
      describe('valid', () => {
        beforeEach(() => {
          beaconId = signal.generate(signal.signals.altBeacon.key);
        });

        it('returns true', () => {
          expect(signal.validate(beaconId, signal.signals.altBeacon.key)).to.be.true;
        });
      });

      describe('invalid', () => {
        describe('length', () => {
          beforeEach(() => {
            beaconId = signal.generate(signal.signals.iBeacon.key);
          });

          it('returns false', () => {
            expect(signal.validate(beaconId, signal.signals.altBeacon.key)).to.be.false;
          });
        });

        describe('charset', () => {
          beforeEach(() => {
            beaconId = randString(signal.signals.iBeacon.length);
          });

          it('returns false', () => {
            expect(signal.validate(beaconId, signal.signals.altBeacon.key)).to.be.false;
          });
        });
      });
    });
  });

  describe('beautify()', () => {
    describe('iBeacon', () => {
      let uuid;

      beforeEach(() => {
        uuid = signal.beautify(signal.generate(signal.signals.iBeacon.key), signal.signals.iBeacon.key);
      });

      it('adds dashes at the appropriate places', () => {
        expect(/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(uuid)).to.be.true;
      });
    });

    describe('Eddystone UID', () => {
      let uuid;

      beforeEach(() => {
        uuid = signal.beautify(signal.generate(signal.signals.eddystoneUid.key), signal.signals.eddystoneUid.key);
      });

      it('adds dashes at the appropriate places', () => {
        expect(/^[a-f0-9]{20}-[a-f0-9]{12}$/i.test(uuid)).to.be.true;
      });
    });

    describe('AltBeacon', () => {
      let beaconId;

      beforeEach(() => {
        beaconId = signal.beautify(signal.generate(signal.signals.altBeacon.key), signal.signals.altBeacon.key);
      });

      it('does not add any dashes', () => {
        expect(/^[a-f0-9]{40}$/i.test(beaconId)).to.be.true;
      });
    });

    describe('Invalid payload-format combination', () => {
      it('throws', () => {
        expect(() => signal.beautify(signal.generate(signal.signals.altBeacon.key), signal.signals.iBeacon.key)).to.throw;
      });
    });
  });

  describe('identify', () => {
    let candidates;
    describe('32 chars', () => {
      describe('lowercase, no dashes', () => {
        beforeEach(() => {
          candidates = signal.identify('de93f975b5d74c9ea8a606fd7cf9d45b');
        });

        it('includes ibeacon', () => {
          expect(candidates).to.include(signal.signals.iBeacon.key);
        });

        it('returns Eddystone UID', () => {
          expect(candidates).to.include(signal.signals.eddystoneUid.key);
        });

        it('returns 2 candidates', () => {
          expect(candidates.length).to.equal(2);
        });
      });

      describe('mixed case, no dashes', () => {
        beforeEach(() => {
          candidates = signal.identify('dE93F975b5D74c9EA8a606fd7cf9d45b');
        });

        it('includes ibeacon', () => {
          expect(candidates).to.include(signal.signals.iBeacon.key);
        });

        it('returns Eddystone UID', () => {
          expect(candidates).to.include(signal.signals.eddystoneUid.key);
        });

        it('returns 2 candidates', () => {
          expect(candidates.length).to.equal(2);
        });
      });


      describe('uppercase, no dashes', () => {
        beforeEach(() => {
          candidates = signal.identify('DE93F975B5D74C9EA8A606FD7CF9D45B');
        });

        it('includes ibeacon', () => {
          expect(candidates).to.include(signal.signals.iBeacon.key);
        });

        it('returns Eddystone UID', () => {
          expect(candidates).to.include(signal.signals.eddystoneUid.key);
        });

        it('returns 2 candidates', () => {
          expect(candidates.length).to.equal(2);
        });
      });

      describe('iBeacon dashes', () => {
        beforeEach(() => {
          candidates = signal.identify('DE93F975-B5D7-4C9E-A8A6-06FD7CF9D45B');
        });

        it('includes ibeacon', () => {
          expect(candidates).to.include(signal.signals.iBeacon.key);
        });

        it('returns 1 candidates', () => {
          expect(candidates.length).to.equal(1);
        });
      });

      describe('Eddystone UID dashes', () => {
        beforeEach(() => {
          candidates = signal.identify('DE93F975B5D7-4C9EA8A606FD7CF9D45B');
        });

        it('includes eddystone uid', () => {
          expect(candidates).to.include(signal.signals.eddystoneUid.key);
        });

        it('returns 1 candidates', () => {
          expect(candidates.length).to.equal(1);
        });
      });
    });

    describe('40 characters', () => {
      describe('lowercase, no dashes', () => {
        beforeEach(() => {
          candidates = signal.identify('de93f975b5d74c9ea8a606fd7cf9d45babcdef01');
        });

        it('includes AltBeacon', () => {
          expect(candidates).to.include(signal.signals.altBeacon.key);
        });

        it('returns 1 candidate', () => {
          expect(candidates.length).to.equal(1);
        });
      });

      describe('mixed case, no dashes', () => {
        beforeEach(() => {
          candidates = signal.identify('dE93F975b5D74c9EA8a606fd7cf9d45babcdef01');
        });

        it('includes AltBeacon', () => {
          expect(candidates).to.include(signal.signals.altBeacon.key);
        });

        it('returns 1 candidate', () => {
          expect(candidates.length).to.equal(1);
        });
      });

      describe('uppercase, no dashes', () => {
        beforeEach(() => {
          candidates = signal.identify('DE93F975B5D74C9EA8A606FD7CF9D45BABCDEF01');
        });

        it('includes AltBeacon', () => {
          expect(candidates).to.include(signal.signals.altBeacon.key);
        });

        it('returns 1 candidates', () => {
          expect(candidates.length).to.equal(1);
        });
      });

      describe('dashes', () => {
        beforeEach(() => {
          candidates = signal.identify('DE93F975B-5D74C9EA8A606FD7CF-9D45BABCDEF01');
        });

        it('returns no candidates', () => {
          expect(candidates.length).to.equal(0);
        });
      });
    });

    describe('10 characters', () => {
      beforeEach(() => {
        candidates = signal.identify('ADE93F975B');
      });

      it('returns no candidates', () => {
        expect(candidates.length).to.equal(0);
      });
    });

    describe('50 characters', () => {
      beforeEach(() => {
        candidates = signal.identify('ADE93F975BADE93F975BADE93F975BADE93F975BADE93F975B');
      });

      it('returns no candidates', () => {
        expect(candidates.length).to.equal(0);
      });
    });
  });
});
