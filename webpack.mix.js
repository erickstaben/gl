const mix = require('laravel-mix')
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.webpackConfig({
  module: {
    rules: [{
      test: /\.less$/,
      use: [
        {
          loader: "less-loader",
          options: {
            javascriptEnabled: true,
            importLoaders: 1,
          }
        },
      ]
    }]
  }
})
mix.react('resources/js/app.js', 'public/js')
    .less('resources/less/app.less', 'public/less')
    .sass('resources/scss/app.scss', 'public/scss');

if (mix.inProduction()) {
  mix.version()
} else {
  mix.sourceMaps()
  mix.browserSync({
    proxy: 'http://fithub.test',
  })
}
