module.exports = {
  productionSourceMap: false,
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/scss/_variables.scss`
        data: `@import "@/styles/_variables.scss";
        @import "@/styles/_mixin.scss";@import "@/styles/_main.scss";`,
      },
    },
  }
};
