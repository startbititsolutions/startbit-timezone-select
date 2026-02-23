const register = ({ strapi }) => {
  strapi.customFields.register({
    name: "timeZone",
    plugin: "startbit-timezone-select",
    type: "string",
    inputSize: {
      default: 6,
      isResizable: true,
    },
  });
};

export default register;