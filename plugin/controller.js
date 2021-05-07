const constants = require('./constants');
const logger = require('./logger');
const { meta } = require('./nodebb');
const utils = require('./utils');


const Beep = {
  banned_words_raw: '',
  banned_words: null,
  banned_urls: null,
  illegal_words: null,
  censorWholeWord: null,
};

const Controller = {};

Controller.loadList = async function loadList() {

  const hash = await meta.settings.get('beep');

  Beep.illegal_words = utils.toRegExp(hash.illegal, true);

  if (hash.id && hash.id.length) {
    const words = hash.id.split(',').filter((word) => !Beep.illegal_words.test(word));
    Beep.banned_words = utils.toRegExp(words, true);
    Beep.banned_words_raw = hash.id;
  } else {
    Beep.banned_words = utils.toRegExp(constants.defaultBanList, true);
    Beep.banned_words_raw = constants.defaultBanList.join(', ');
    logger.verbose('Default list of Banned Words is enabled. Please go to administration panel to change the list.');
  }

  Beep.banned_urls = utils.toRegExp(hash.urls);

  Beep.censorWholeWord = hash.censorWholeWord === 'on';
  if (meta.config) {
    meta.config.beep = meta.config.beep || {};
    meta.config.beep.censorWholeWord = Beep.censorWholeWord;
  }
};

Controller.getBannedListRaw = function getBannedListRaw() {
  return Beep.banned_words_raw;
};

Controller.getIllegalWords = function getIllegalWords() {
  return Beep.illegal_words;
};

Controller.parseContent = function parseContent(content, symbol) {
  const nil = '^(?!x)x';
  return utils.parseContent(content, Beep.banned_words || nil, Beep.banned_urls || nil, Beep.censorWholeWord, symbol || '&ast;');
};

module.exports = Controller;
