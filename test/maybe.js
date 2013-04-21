
var _          = require('lodash');
var Maybe      = require('../');

// test data
var justs      = [true, false, 0, '', [], {}],
    nothings   = [undefined, null],
    reliable   = function () { return process.hrtime(); },
    unreliable = function () { return Math.random() > 0.5 || undefined; };

describe('Maybe', function () {

  it('should provide a Maybe constructor', function () {
    (new Maybe() instanceof Maybe).should.be.true;
  });

  it('should have a property `val` equivalent to its constructor\'s first parameter', function () {
    justs.forEach(function (val) {
      (new Maybe(val)).val.should.equal(val);
    });
  });

});

describe('Maybe.value()', function () {

  it('should return a known-to-exist value given to its constructor', function () {
    justs.forEach(function (val) {
      (new Maybe(val)).value().should.equal(val);
    });
  });

  it('should return Nothing if a known-not-to-exist value is given to its constructor', function () {
    nothings.forEach(function (val) {
      (new Maybe(val)).value().should.be.an.instanceof(Maybe.Nothing);
    });
  });

  it('should return values consistently for a reliable input function', function () {
    var maybe = new Maybe(reliable);
    _(10000).times(function () {
      maybe.value().should.not.be.an.instanceof(Maybe.Nothing);
    });
  });

  it('should return a mixture of values and Nothings for an unreliable input function', function () {
    var maybe    = new Maybe(unreliable),
        results  = _.times(10000, function () { return maybe.value(); });

    var justs    = _.filter(results, function (r) { return !(r instanceof Maybe.Nothing); });
    var nothings = _.filter(results, function (r) { return r instanceof Maybe.Nothing; });

    nothings.should.not.be.empty;
    justs.should.not.be.empty;
  });

});

describe('Maybe.memoize()', function () {

  it('should manipulate the Maybe to always produce the same evaluated value', function (done) {
    var maybe = new Maybe(reliable).memoize();

    var first = maybe.value();
    process.nextTick(function () { maybe.value().should.eql(first); done(); });
  });

});

describe('Maybe.isJust()', function () {

  it('should return true for known-to-exist, and false for known-not-to-exist values', function () {
    justs.forEach(function (val) {
      (new Maybe(val)).isJust().should.be.true;
    });
    nothings.forEach(function (val) {
      (new Maybe(val)).isJust().should.be.false;
    });
  });

});

describe('Maybe.isNothing()', function () {

  it('should return true for known-not-to-exist, and false for known-to-exist values', function () {
    nothings.forEach(function (val) {
      (new Maybe(val)).isNothing().should.be.true;
    });
    justs.forEach(function (val) {
      (new Maybe(val)).isNothing().should.be.false;
    });
  });

});
