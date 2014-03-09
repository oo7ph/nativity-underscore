nativity-underscore
====================

[nativity](https://github.com/metaraine/cint) plugin to safely install [underscore](http://underscorejs.org) methods onto native Array, String, Number, Object, and Function prototypes for more elegant syntax.

## Install

    npm install --save nativity-underscore

## Usage

    require('nativity-underscore').install();

    // now use underscore methods on native object prototypes
    console.log([1,2,3,4,5].first());
    // result: 1

## TODO:
* Make available on bower
* Make available on NPM
* Add unit tests with mocha