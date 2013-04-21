
var Maybe = require('../'),
    types = [true, false, 0, '', [], {}];

describe('Maybe', function () {

  it('should provide a Maybe constructor', function () {
    (new Maybe() instanceof Maybe).should.be.true;
  });

  it('should have a maybe.val equivalent to its constructor\'s first parameter', function () {
    types.forEach(function (val) {
      (new Maybe(val)).val.should.eql(val);
    });
  });

});

describe('Maybe.value', function () {

  it('should return a known-to-exist value given to its constructor', function () {
    types.forEach(function (val) {
      (new Maybe(val)).value().should.eql(val);
    });
  });

});
