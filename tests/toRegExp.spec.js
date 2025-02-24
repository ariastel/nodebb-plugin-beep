'use strict';

const assert = require('assert');

const { toRegExp } = require('../plugin/utils');

assert.equal(toRegExp(['bad', 'words', 'here'], true), '/\\b(?:bad|words|here)\\b/gi');
assert.equal(toRegExp('bad,words, here'), '/bad|words|here/gi');
assert.equal(toRegExp('今,野', true), '/今|野/gi');
assert.equal(toRegExp(null), '/^(?!x)x/gi');

console.log('toRegExp passed');
