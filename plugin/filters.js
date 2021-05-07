const constants = require('./constants');
const controller = require('./controller');
const logger = require('./logger');
const { meta, translator } = require('./nodebb');


const Filters = {};

// filter:admin.header.build
Filters.adminHeaderBuild = async function adminHeaderBuild(customHeader) {
  customHeader.plugins.push({
    route: `/${constants.plugin.route}`,
    icon: constants.plugin.icon,
    name: constants.displayName,
  });
  return customHeader;
};

// filter:parse.post
Filters.parse = async function parse(data) {

  if (!data || !data.postData || !data.postData.content) {
    return data;
  }

  data.postData.content = controller.parseContent(data.postData.content);
  return data;
};

// filter:parse.raw, filter:parse.aboutme
Filters.parseRaw = async function parseRaw(content) {

  if (!content) {
    return content;
  }

  content = controller.parseContent(content);
  return content;
};

// filter:parse.signature
Filters.parseSignature = async function parseSignature(data) {

  if (!data || !data.userData || !data.userData.signature) {
    return data;
  }

  data.userData.signature = controller.parseContent(data.userData.signature);
  return data;
};

// filter:post.getFields
Filters.postGetFields = async function postGetFields(data) {

  if (data.fields.indexOf('content') !== -1) {
    data.posts.forEach((post) => {
      post.content = controller.parseContent(post.content);
    });
  }

  return data;
};

// filter:topic.create, filter:topic.edit
Filters.parseTopic = async function parseTopic(data) {

  if (Object.prototype.hasOwnProperty.call(data.topic, 'title')) {
    data.topic.title = controller.parseContent(data.topic.title, constants.replacementSymbol);
  }

  if (Object.prototype.hasOwnProperty.call(data.topic, 'slug')) {
    data.topic.slug = controller.parseContent(data.topic.slug, constants.replacementSymbol);
  }

  if (Object.prototype.hasOwnProperty.call(data.topic, 'titleRaw')) {
    data.topic.titleRaw = controller.parseContent(data.topic.titleRaw, constants.replacementSymbol);
  }

  return data;
};

// filter:tags.filter
Filters.filterTags = async function filterTags(data) {

  let match;
  data.tags.some((tag) => {
    match = tag && tag.match(controller.getIllegalWords());
    return !!match;
  });

  if (match) {
    const translated = await translator.translate(`[[beep:tagMatch.error, ${match[0]}]]`);
    throw new Error(translated);
  }

  data.tags = data.tags.map((tag) => controller.parseContent(tag, '+'));

  return data;
};

// filter:topic.create, filter:topic.edit, filter:topic.reply
Filters.checkForIllegalWords = async function checkForIllegalWords(data) {

  const postContent = data.content || (data.data && data.data.content);
  const postTitle = data.title || (data.topic && data.topic.title);

  const titleMatch = postTitle && postTitle.match(controller.getIllegalWords());
  if (titleMatch) {
    const translated = await translator.translate(`[[beep:titleMatch.error, ${titleMatch[0]}]]`);
    throw new Error(translated);
  }

  const contentMatch = postContent && postContent.match(controller.getIllegalWords());
  if (contentMatch) {
    const translated = await translator.translate(`[[beep:contentMatch.error, ${contentMatch[0]}]]`);
    throw new Error(translated);
  }

  return data;
};

// filter:config.get
Filters.getConfig = async function getConfig(config) {

  try {
    const censorWholeWord = await meta.settings.getOne('beep', 'censorWholeWord');
    config.beep = {
      censorWholeWord: censorWholeWord === 'on',
    };
  } catch (e) {
    logger.error(e);
  }

  return config;
};

// filter:messaging.getTeaser
Filters.messagingGetTeaser = async function messagingGetTeaser(data) {
  data.teaser.content = controller.parseContent(data.teaser.content);
  return data;
};

module.exports = Filters;
