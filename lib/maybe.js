/**
 * Maybe for Javascript
 * Never null again
 *
 * @author Christoher Rogers <chrissrogers@gmail.com>
 * @module maybe
 */

var Maybe, Just, Nothing;

/**
 * Builds a Maybe from another type
 *
 * @constructor
 * @param val The data to be wrapped in a Maybe. If a function is
 *            supplied it will be evaluated when the Maybe is read
 * @return {Maybe}
 */
Maybe = module.exports = function (val) {

  if (val instanceof Maybe) return val;

  if (this instanceof Maybe) {

    this.val = val;

  } else return new Maybe(val);

};

/**
 * Evaluates the maybe and determines whether we have a Just or a Nothing
 *
 * @private
 * @return {Nothing|Just}
 */
Maybe.prototype.evaluate = function () {

  // If this Maybe is wrapping a function, evaluate it now
  var value = typeof this.val === 'function' ? this.val() : this.val;

  return value instanceof Nothing || value instanceof Just
    ? value
    : value === undefined || value === null
      ? new Nothing()
      : new Just(value);

};

/**
 * Unwraps a Maybe
 * If the `Maybe<value>` is a Just, return `a`, otherwise return `Nothing`
 *
 * @return The Maybe's value
 * @return {Nothing} if the Maybe's value is Nothing
 */
Maybe.prototype.value = function () {

  var maybe = this.evaluate();

  return maybe instanceof Just ? maybe.val : maybe;

};

/**
 * Determines whether this Maybe's value is a Just
 *
 * @return {Boolean}
 */
Maybe.prototype.isJust = function () {

  return this.evaluate() instanceof Just;

};

/**
 * Determines whether this Maybe's value is Nothing
 *
 * @return {Boolean}
 */
Maybe.prototype.isNothing = function () {

  return this.evaluate() instanceof Nothing;

};

/**
 * Will transform this Maybe's evaluation scheme into a memoized pattern
 *
 * Use this if you wish to evaluate this Maybe only once and resue
 * the result
 *
 * @return {this}
 */
Maybe.prototype.memoize = function () {

  this._evaluate = this.evaluate;
  this.evaluate = function () {
    return this.memoVal || (this.memoVal = this._evaluate());
  }.bind(this);

  return this;

};


/**
 * Wraps a value in an indication of its confimed existence
 *
 * @constructor
 * @return {Just}
 */
Just = Maybe.Just = function (val) {
  this.val = val;
  return this;
};


/**
 * Indicates a value which is nothing
 *
 * @return {Nothing}
 */
Nothing = Maybe.Nothing = function () {};
