// next-i18next library configuration
// https://github.com/isaachinman/next-i18next
const path = require("path");

module.exports = {
  i18n: {
    reloadOnPrerender: true, // reload texts when reload page.
    locales: ["en"],
    defaultLocale: "en",
    localePath: path.resolve("./public/locales"),
  },
};
