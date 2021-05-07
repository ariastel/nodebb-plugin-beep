const isLatin = /^\w+$/;

function parseContent(content, bannedWords, bannedUrls, censorWholeWord, symbol) {
  if (!content) {
    return content;
  }

  symbol = symbol || '*';

  function censor(match) {
    if (!isLatin.test(match)) {
      return '[censored]';
    }

    const l = match.length;
    let out = match[0];

    let i = l - 2;
    while (i) {
      out += symbol;
      // eslint-disable-next-line no-plusplus
      i--;
    }

    return out + match[l - 1];
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
    const latin = arr
      .filter((word) => isLatin.test(word))
      .map((word) => word.trim().replace(/([-[\]{}()*+?.,\\^$|#\s])/g, '\\$1'))
      .join('|');

    const notLatin = arr
      .filter((word) => !isLatin.test(word))
      .map((word) => word.trim().replace(/([-[\]{}()*+?.,\\^$|#\s])/g, '\\$1'))
      .join('|');

    if (latin && notLatin) {
      str = `\\b(?:${latin})\\b|(?:${notLatin})`;
    } else if (latin) {
      str = `\\b(?:${latin})\\b`;
    } else if (notLatin) {
      str = notLatin;
    }
  } else {
    str = arr.filter(Boolean).map((word) => word.trim().replace(/([-[\]{}()*+?.,\\^$|#\s])/g, '\\$1')).join('|');
  }

  return new RegExp(str || '^(?!x)x', 'ig');
}

module.exports = { parseContent, toRegExp };
