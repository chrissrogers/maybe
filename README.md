maybe [![Build Status](https://travis-ci.org/chrissrogers/maybe.png)](https://travis-ci.org/chrissrogers/maybe)
=====

This is the Maybe monad for JavaScript. Never null again.

* [Introduction](#introduction)

## Introduction

Maybe is a spiritual implementation of [Haskell's Data.Maybe][hs-maybe]. Its purpose is to provide
a useful monad around data which may or may not exist at runtime.

## Why?

[Null is bad][tony-says-so].

Detection of data absence can be on-trivial
```js
typeof undefined; // => "undefined"
typeof null;      // => "object"
```

Maybe seeks to wrap data presence in a monad for handling such concerns. By using Maybe, you are
declaring that your value may or may not exist when it is accessed. This encourages explicit
handling of these cases, and ensures uniform treatment of such cases.

## Usage

```bash
npm i maybe
```

```js
var Maybe = require('maybe');

var unsure = Maybe(Math.random() < 0.5 || undefined);

unsure.value(); // => true|Nothing
```

Maybe can wrap any literal value and handle its absence by returning a `Maybe.Nothing`.

While this is all well and good for data uniformity, the true power of Maybe comes when you use it
to wrap a function. The function is evaluated each time the Maybe's value is accessed.

```js
var Maybe = require('maybe');

var unsure = Maybe(function () { // this may or may not return something });

for(var i = 1000; i > 0; --i) unsure.value(); // => will return a mixture of valid data and Nothing
```

To avoid excessive calls to a function wrapped in a Maybe, a `memoize` method is exposed.

```js
var Maybe = require('maybe');

var unsure = Maybe(function () { // this may or may not return something });

unsure.memoize();

unsure.value(); // => will return data or Nothing and will henceforth return that same result
```


[hs-maybe]: http://www.haskell.org/ghc/docs/7.4-latest/html/libraries/base-4.5.1.0/Data-Maybe.html
[tony-says-so]: http://qconlondon.com/london-2009/presentation/Null+References:+The+Billion+Dollar+Mistake
