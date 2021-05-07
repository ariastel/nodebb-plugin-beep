const actions = require('./actions');
const constants = require('./constants');
const controller = require('./controller');
const filters = require('./filters');
const logger = require('./logger');


const Plugin = {};

// NodeBB list of Hooks: https://github.com/NodeBB/NodeBB/wiki/Hooks
Plugin.hooks = {
  actions,
  filters,
  statics: {
    async load(params) {

      const { router, middleware } = params;
      logger.verbose('initializing');

      function renderAdmin(req, res) {
        res.render(`admin/${constants.plugin.route}`, {});
      }

      router.get(`/admin/${constants.plugin.route}`, middleware.admin.buildHeader, renderAdmin);
      router.get(`/api/admin/${constants.plugin.route}`, renderAdmin);
      router.get(`/api/${constants.plugin.route}`, (_, res) => {
        const bannedWordsRaw = controller.getBannedListRaw();
        if (bannedWordsRaw) {
          res.status(200).send(bannedWordsRaw);
        } else {
          res.status(501);
        }
      });

      await controller.loadList();

      return params;
    },
  },
};

module.exports = Plugin;
