# VisualHash
Translates an `<input>` value to a collection of colors

## Dependencies
VisualHash depends on a external hash implementation.
At the moment it will try to find an use automatically, any of the following implementations:

* [Chris Veness' SHA1 Implementation](http://www.movable-type.co.uk/scripts/sha1.html)
* [Joseph Myers' MD5 Implementation](http://www.myersdaily.org/joseph/javascript/md5-text.html)
* [Jeff Mott's Crypto-js Collection](http://code.google.com/p/crypto-js/) __note__ that it only finds for Crypto.MD5, Crypto.SHA1 and Crypto.SHA256

Also, you're not forced to use any of this implementations, VisualHash accepts an option of `hashFunction` 
where you're free to use any hashing implementation, as long as your function accepts a string as first argument
and returns a hash.

## Getting Started

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Running Tests
Right now to run tests, you need to have [node](https://github.com/joyent/node) installed
as well as the following packages (inside the `tests` folder):

* [mocha](https://github.com/visionmedia/mocha) `npm install mocha`
* [chai](https://github.com/logicalparadox/chai/) `npm install chai`
* [jsdom](https://github.com/tmpvar/jsdom) `npm install jsdom`

Then either open the
[index.html](https://github.com/Couto/VisualHash/blob/master/tests/index.html)
in your browser window or run `make test` or `make test-browser` in your terminal from the root folder.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding
style. Add unit tests for any new or changed functionality. Lint and test your
code.

_Also, please don't edit files in the "dist" subdirectory as they are generated
automatically. You'll find source code in the "src" subdirectory!_

## TODO
* ~~Make Makefile to run tests, minify and create dist files.~~ ✓
* Finish tests
* Fix JSCoverage to better replicate the script usage
* Write default CSS

## License
Copyright (c) 2012 Luís Couto
Licensed under the [MIT License](http://couto.mit-license.org)
