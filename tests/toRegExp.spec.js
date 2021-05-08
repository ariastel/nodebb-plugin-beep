'use strict';

const assert = require('assert');

const { toRegExp } = require('../plugin/utils');

assert.equal(toRegExp("bad,word,here", true), '/\\bbad\\b|\\bword\\b|\\bhere\\b/gi');
assert.equal(toRegExp('bad,words, here'), '/bad|words|here/gi');
assert.equal(toRegExp(["привет"], true), '/^привет[-[\\]{}()*+?.,\\\\^$|#;\\s]|[-[\\]{}()*+?.,\\\\^$|#;\\s]привет+$|^привет+$|[-[\\]{}()*+?.,\\\\^$|#;\\s]привет[-[\\]{}()*+?.,\\\\^$|#;\\s]/gi');
assert.equal(toRegExp(null), '/^(?!x)x/gi');

console.log('toRegExp passed');
