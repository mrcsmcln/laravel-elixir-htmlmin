var gulp = require('gulp');
var Elixir = require('laravel-elixir');

var $ = Elixir.Plugins;
var config = Elixir.config;

$.htmlmin = require('gulp-htmlmin');

var _ = require('underscore');

_.mixin({
    deepExtend: require('underscore-deep-extend')(_)
});

/*
 |----------------------------------------------------------------
 | HTML Minification
 |----------------------------------------------------------------
 |
 | This task offers a simple way to minify all your HTML assets.
 | You can either minify a single file or a entire directory.
 | Don't forget the path if you specify alternate options.
 |
 */

Elixir.extend('htmlmin', function (src, output, options) {
    config.templating = config.templating ? config.templating : {};
    config.templating.htmlmin = _.deepExtend({
        folder: 'html',
        outputFolder: '',
        options: {
            removeComments: true,
            removeCommentsFromCDATA: true,
            removeCDATASectionsFromCDATA: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            caseSensitive: true
        }
    }, config.templating.htmlmin);

    var paths = prepGulpPaths(src, output);

    new Elixir.Task('htmlmin', function () {
        this.log(paths.src, paths.output);

        return gulp
            .src(paths.src.path)
            .pipe($.htmlmin(options || config.templating.htmlmin.options)
                .on('error', function (error) {
                    new Elixir.Notification().error(error, 'HTML Minification Failed!');
                    this.emit('end');
                })
            ).pipe(gulp.dest(paths.output.baseDir))
            .pipe(new Elixir.Notification('HTML Minified!'))
        ;
    }).watch(config.get('assets.templating.htmlmin.folder') + '/**/*.html')
    .ignore(paths.output.path)
});


/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string|null}  output
 * @return {GulpPaths}
 */
var prepGulpPaths = function (src, output) {
    return new Elixir.GulpPaths()
        .src(src, config.get('assets.templating.htmlmin.folder'))
        .output(output || config.get('public.templating.htmlmin.outputFolder'), '.')
    ;
}
