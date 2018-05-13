let { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix.js('javascript/vue/init.js', 'dist/app.js')
  .js('javascript/bootstrap.js', 'dist/bootstrap.js');

mix.sass('scss/app.scss', 'dist/app.css', { sourceComments: false })
  .options({processCssUrls: false });
