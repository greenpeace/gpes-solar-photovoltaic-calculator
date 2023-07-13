/* jshint esversion:6 */

const CleanCSS = require("clean-css");

module.exports = (function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });
  return {
    dir: {
      output: "docs"
    }
  };
});