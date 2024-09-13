'use strict';

module.exports = ({ strapi }) => {
  // register phase
  strapi.customFields.register([{
    name: "timeZone",
    plugin: "startbit-timezone-select",
    type: "string",    
  }]);
};
