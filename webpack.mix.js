const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/src/index.js', 'public/js')
    .vue()
    .scripts([
        'resources/src/js/**/*.src.js',
        'resources/src/js/index.js'
    ], 'resources/dist/js/app.js').then(() => {
        mix.js([
            'public/js/index.js',
            'resources/dist/js/app.js'
        ], 'app.js');
    });

mix.sass('resources/src/sass/app.scss', 'public/css', [
    //
]);

mix.webpackConfig({
    module: {
        rules: [
            {
                test: /\.scss/,
                loader: 'import-glob-loader'
            }
        ]
    }
});