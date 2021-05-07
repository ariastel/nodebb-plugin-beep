'use strict';

var isLatin = /^\w+$/;

function toRegExp(arr, fullWord) {
	if (!Array.isArray(arr)) {
		arr = (arr || '').toString().split(',');
	}
	arr = arr.filter(Boolean);

	var str;
	if (fullWord) {
    var latin = arr.filter(function (word) {
      return isLatin.test(word);
    }).map(function (word) {
      return "\\b"+word.trim().replace(/([-[\]{}()*+?.,\\^$|#\s])/g, '\\$1')+"\\b";
    }).join('|');

    var notLatin = arr.filter(function (word) {
      return !isLatin.test(word);
    }).map(function (word) {
      word = word.trim().replace(/([-[\]{}()*+?.,\\^$|#\s])/g, '\\$1');
      return "^"+word+"[-[\\]{}()*+?.,\\\\^$|#;\\s]|[-[\\]{}()*+?.,\\\\^$|#;\\s]"+word+"+$|^"+word+"+$|[-[\\]{}()*+?.,\\\\^$|#;\\s]"+word+"[-[\\]{}()*+?.,\\\\^$|#;\\s]";
    }).join('|');

    if (latin && notLatin) {
      str = latin+"|"+notLatin;
    } else if (latin) {
      str = latin;
    } else if (notLatin) {
      str = notLatin;
    }
	} else {
		str = arr.filter(Boolean).map(function (word) {
			return word.trim().replace(/([-[\]{}()*+?.,\\^$|#\s])/g, '\\$1');
		}).join('|');
	}

	return new RegExp(str || '^(?!x)x', 'ig');
}

module.exports = toRegExp;
