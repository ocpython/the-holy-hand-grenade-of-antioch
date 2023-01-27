/* eslint-disable prettier/prettier */

module.exports = {
  // What this does is resolve @import statements in your CSS first, and
  // then take all your CSS in as one file and run all of it with postcss-preset-env.
  // If you  swapped the order, postcss-preset-env would only process your entry file
  // and none of your @imported files would be autoprefixed/transpiled.
  // The browsers option is for Autoprefixer, which comes built-in.
  // This prevents you from writing browser prefix-less CSS.

  plugins: {
    "postcss-import": {},
    "postcss-preset-env": {
      browsers: ['last 2 versions', '> 5%'],
    },
  },
};
