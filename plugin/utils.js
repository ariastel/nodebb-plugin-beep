const isLatin = /^\w+$/;

function parseContent(content, bannedWords, bannedUrls, censorWholeWord, symbol) {
  if (!content) {
    return content;
  }

  symbol = symbol || '*';

  function censor(match) {
    const symbols = new RegExp('[-[\\]{}()*+?.,\\\\^$|#\\s;_]');
    const isP1 = symbols.exec(match[0]) != null;
    const isP2 = symbols.exec(match[match.length - 1]) != null;
    const l = match.length;
    let out = isP1 ? match[1] : match[0];

    let i = l - 2;
    if (isP1 && isP2) {
      i -= 2;
    } else if (isP1 || isP2) {
      i -= 1;
    }
    while (i>0) {
      out += symbol;
      i -= 1;
    }
    return (isP1 ? match[0] : '') + out + (isP2 ? match[l - 2] : '') + match[l - 1];
  }

  const replacement = censorWholeWord ? '[censored]' : censor;
  return content
    .replace(bannedWords, replacement)
    .replace(bannedUrls, '[link removed]');
}

function toRegExp(arr, fullWord) {
  if (!Array.isArray(arr)) {
    arr = (arr || '').toString().split(',');
  }
  arr = arr.filter(Boolean);

  let str;
  if (fullWord) {
    const latin = arr.filter((word) => isLatin.test(word)).map((word) => `\\b${word.trim().replace(/([-[\]{}()*+?.,\\^$|#\s])/g, '\\$1')}\\b`).join('|');

    const notLatin = arr.filter((word) => !isLatin.test(word)).map((word) => {
      word = word.trim().replace(/([-[\]{}()*+?.,\\^$|#\s])/g, '\\$1');
      return `^${word}[-[\\]{}()*+?.,\\\\^$|#;\\s]|[-[\\]{}()*+?.,\\\\^$|#;\\s]${word}+$|^${word}+$|[-[\\]{}()*+?.,\\\\^$|#;\\s]${word}[-[\\]{}()*+?.,\\\\^$|#;\\s]`;
    }).join('|');

    if (latin && notLatin) {
      str = `${latin}|${notLatin}`;
    } else if (latin) {
      str = latin;
    } else if (notLatin) {
      str = notLatin;
    }

  } else {
    str = arr.filter(Boolean).map((word) => word.trim().replace(/([-[\]{}()*+?.,\\^$|#\s])/g, '\\$1')).join('|');
  }

  return new RegExp(str || '^(?!x)x', 'ig');
}

module.exports = { parseContent, toRegExp };
