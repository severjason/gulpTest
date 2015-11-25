/**
 * Created by severjason on 18.11.2015.
 */
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    cleanDest = require('gulp-clean-dest'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    rubySass = require('gulp-ruby-sass'),
    compass = require('gulp-compass'),
    coffee = require('gulp-coffee');

var sources = {
    coffee:['components/coffee/tagline.coffee'],
    js : [
        'components/scripts/rclick.js',
        'components/scripts/pixgrid.js',
        'components/scripts/tagline.js',
        'components/scripts/template.js'
    ],
    sass:['components/sass/style.scss'],
    sassPartials:['components/sass/*.scss']
};

gulp.task('coffee', function() {
    gulp.src(sources.coffee)
        .pipe(coffee({bare: true})
            .on('error', gutil.log))
        .pipe(gulp.dest('components/scripts'))
});
gulp.task('js', function() {
    gulp.src(sources.js)
        .pipe(concat('script.js'))
        .pipe(browserify()
            .on('error',gutil.log))
        .pipe(gulp.dest('builds/development/js'))
});

gulp.task('compass', function() {
    gulp.src(sources.sass)
        .pipe(compass({
            sass:'components/sass',
            image:'builds/development/images',
            style:'expanded',
            comments: true
        }))
        .on('error', function(error) {
        // Would like to catch the error here
        console.log(error);
        this.emit('end');
    })
        .pipe(gulp.dest('builds/development/css'))
        .pipe(cleanDest('css'))
});

gulp.task('watch', function(){
    gulp.watch(sources.coffee,['coffee']);
    gulp.watch(sources.js,['js']);
    gulp.watch(sources.sassPartials,['compass']);
});

gulp.task('default',['coffee','js','compass']);
