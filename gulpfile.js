/**
 * Created by severjason on 18.11.2015.
 */
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    cleanDest = require('gulp-clean-dest'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    connect = require('gulp-connect'),
    compass = require('gulp-compass'),
    gulpif = require('gulp-if'),
    minifyHTML = require('gulp-minify-html'),
    jsonminify = require('gulp-jsonminify'),
    uglify = require('gulp-uglify');

    coffee = require('gulp-coffee');

var env,
    sources,
    outputDir,
    sassStyle;


env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    outputDir = 'builds/development/';
    sassStyle = 'expanded';
}
else {
    outputDir = 'builds/production/';
    sassStyle = 'compressed';
}

sources = {
    coffee: ['components/coffee/tagline.coffee'],
    js: [
        'components/scripts/rclick.js',
        'components/scripts/pixgrid.js',
        'components/scripts/tagline.js',
        'components/scripts/template.js'
    ],
    sass: ['components/sass/style.scss'],
    sassPartials: ['components/sass/*.scss'],
    htmlDev: ['builds/development/*.html'],
    jsonDev: ['builds/development/js/*.json']
};

gulp.task('coffee', function () {
    gulp.src(sources.coffee)
        .pipe(coffee({bare: true})
            .on('error', gutil.log))
        .pipe(gulp.dest('components/scripts'))
});
gulp.task('js', function () {
    gulp.src(sources.js)
        .pipe(concat('script.js'))
        .pipe(browserify()
            .on('error', gutil.log))
        .pipe(gulpif(env === 'production',uglify()))
        .pipe(gulp.dest(outputDir + 'js'))
        .pipe(connect.reload())
});

gulp.task('compass', function () {
    gulp.src(sources.sass)
        .pipe(compass({
            sass: 'components/sass',
            image: outputDir + 'images',
            style: sassStyle,
            comments: true
        }))
        .on('error', function (error) {
            // Would like to catch the error here
            console.log(error);
            this.emit('end');
        })
        .pipe(gulp.dest(outputDir + 'css'))
        .pipe(cleanDest('css'))
        .pipe(connect.reload())
});

gulp.task('watch', function () {
    gulp.watch(sources.coffee, ['coffee']);
    gulp.watch(sources.js, ['js']);
    gulp.watch(sources.sassPartials, ['compass']);
    gulp.watch(sources.htmlDev,['html']);
    gulp.watch(sources.jsonDev,['json']);
});
gulp.task('connect', function () {
    connect.server({
        port: 8888,
        root: outputDir,
        livereload: true
    })

});
gulp.task('html', function(){
   gulp.src(sources.htmlDev)
       .pipe(gulpif(env === 'production', minifyHTML()))
       .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
       .pipe(connect.reload())
});
gulp.task('json', function(){
    gulp.src(sources.jsonDev)
        .pipe(gulpif(env === 'production', jsonminify()))
        .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
        .pipe(connect.reload())
});

gulp.task('default', ['html','json', 'coffee', 'js', 'compass', 'connect', 'watch']);
