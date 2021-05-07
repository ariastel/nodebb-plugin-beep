'use strict';

var isLatin = /^\w+$/;

function parseContent(content, banned_words, banned_urls, censorWholeWord, symbol) {
	if (!content) {
		return content;
	}

	symbol = symbol || '*';

  function censor(match) {
    var symbols = new RegExp("[-[\\]{}()*+?.,\\\\^$|#\\s;_]")
    var isP1 = symbols.exec(match[0])!=null;
    var isP2 = symbols.exec(match[match.length-1])!=null;
    var l = match.length;
    var out = isP1?match[1]:match[0];

    var i = l - 2 -(isP1 || isP2?isP1&&isP2?2:1:0);
    while (i) {
      out += symbol;
      // eslint-disable-next-line no-plusplus
      i--;
    }
    return (isP1?match[0]:"")+out +(isP2?match[l-2]:"")+ match[l-1];
  }

	var replacement = censorWholeWord ? '[censored]' : censor;
	return content
		.replace(banned_words, replacement)
		.replace(banned_urls, '[link removed]');
}

module.exports = parseContent;
