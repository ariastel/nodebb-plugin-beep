const controller = require('./controller');


const Actions = {};

Actions.settingsSet = async function settingsSet(hash) {
  if (hash && hash.plugin === 'beep') {
    await controller.loadList();
  }
};

module.exports = Actions;
