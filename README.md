maybe [![Build Status](https://travis-ci.org/chrissrogers/maybe.png)](https://travis-ci.org/chrissrogers/maybe) [![Coverage Status](https://coveralls.io/repos/chrissrogers/maybe/badge.png?branch=master)](https://coveralls.io/r/chrissrogers/maybe)
=====

This is the Maybe monad for JavaScript. Never null again.

* [Introduction](#introduction)
* [Why?](#why)
* [Reference](#reference)
* [Usage Patterns](#usage-patterns)
* [Contribution](#contribution)

## Introduction

```bash
$ npm install maybe
```

Maybe is a spiritual implementation of [Haskell's Data.Maybe][hs-maybe]. Its purpose is to provide
a useful monad around data which may or may not exist at runtime.

Node 0.8+ is supported. Older versions of Node may work, but are not targetted.

## Why?

[Null is dangerous][tony-says-so].

Detection of data absence can be non-trivial
```js
typeof undefined; // => "undefined"
typeof null;      // => "object"
```

Node.js indicates a datum's non-presence using a mixture of `undefined` assignments and `null`
references. At best, this adds unnecessarily to program complexity in handling these cases; at
worst, it discourages complete absence checks and leads to fault intolerance.

Maybe seeks to wrap data presence in a monad for handling such concerns. By using Maybe, you are
declaring that your value may or may not exist when it is accessed. This encourages explicit
handling of these cases, and ensures uniform treatment of such cases.

## Reference

### `Maybe(val)`

The Maybe constructor is the sole object exposed by the module. For convenience, it also operates
as a factory. It takes one parameter, which may be any primitive or complex JavaScript value. It is
the datum which the Maybe will wrap.

```js
var Maybe = require('maybe');

// The following are equivalent
(new Maybe(true));
Maybe(true);
```

Maybe is most powerful when it wraps a function. Maybe will evaluate the function when its value is
accessed, allowing for your control flow to interpret the state of some processing using simple
Maybe data access.

```js
var Maybe = require('maybe'),
    start = Date.now();

// We expect that our value function will return `true` after a 2 seconds have passed, and
// otherwise will not return (return undefined)
var unsure = Maybe(function () {
  return Date.now() > start + 2000 || undefined;
});

unsure.value()                  // => Maybe.Nothing
setTimeout(unsure.value, 2000); // => true
```

### `maybe.value()`

Accesses the value wrapped by the Maybe, returning the value if it is present, or `Maybe.Nothing`
if it is not.

### `maybe.isJust()`

Returns true if the Maybe's value is a `Maybe.Just` type, indicating that it is known to exist.

Returns false if the Maybe's value is a `Maybe.Nothing`.

### `maybe.isNothing()`

Opposite of `maybe.isJust()`

### `maybe.memoize()`

Calling `memoize` on your maybe will ensure that its value function is only executed the first time
you call `maybe.value()`, and that its return value will be cached for all subsequest calls
of `maybe.value()`.

```js
var Maybe  = require('maybe'),
    unsure = Maybe(function () { /** ... */ });

unsure.memoize();
unsure.value(); // => will return data or `Maybe.Nothing` and will henceforth return that same result
```

### `Maybe.Nothing`

A simple monadic type to represent a nonexistant value.

### `Maybe.Just`

A simple monadic type representing a value that is known to exist.

## Usage Patterns

```js
var Maybe = require('maybe'),
    unsure = Maybe(Math.random() < 0.5 || undefined);

unsure.value(); // => true|Maybe.Nothing
```

Maybe can wrap any literal value and handle its absence by returning a `Maybe.Nothing`.

While this is all well and good for data uniformity, the true power of Maybe comes when you use it
to wrap a function. The function is evaluated each time the Maybe's value is accessed.

```js
var Maybe = require('maybe'),
    unsure = Maybe(function () { /** this may or may not return something */ });

for (var i = 1000; i > 0; --i) {
  unsure.value(); // => will return a mixture of valid data and `Maybe.Nothing`
}
```

## Contribution

Please contribute! See the [GitHub issues][gh-issues] for project goals, feature discussion, and bug
reports.

I would like to encourage all new code to include associated tests and jsdoc annotation. Thanks!

[hs-maybe]: http://www.haskell.org/ghc/docs/7.4-latest/html/libraries/base-4.5.1.0/Data-Maybe.html
[tony-says-so]: http://qconlondon.com/london-2009/presentation/Null+References:+The+Billion+Dollar+Mistake

[gh-issues]: https://github.com/chrissrogers/maybe/issues
