const {mix} = require('laravel-mix');

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


// Prevents Mix's automatic configuring of jQuery, so that we
// can set it up ourselves later
// https://github.com/JeffreyWay/laravel-mix/issues/229#issuecomment-276230983
mix.autoload({});

mix
    .js('js/main.js', 'build/js')
    .sourceMaps()
    .extract(['vue', 'vuex', 'axios'])
    .sass('sass/main.scss', 'build/css')
    .options({
        processCssUrls: false,
    })


