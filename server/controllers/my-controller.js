'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('startbit-timezone-select')
      .service('myService')
      .getWelcomeMessage();
  },
});
