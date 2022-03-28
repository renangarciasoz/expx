import "@testing-library/jest-dom/extend-expect";

if (global.window) {
  global.window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: function () {},
        removeListener: function () {},
      };
    };
}

global.window = {
  location: {
    pathname: "pathname",
    reload: () => null,
  },
};
