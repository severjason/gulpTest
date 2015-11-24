/**
 * Created by severjason on 18.11.2015.
 */
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    coffee = require('gulp-coffee');

var sources = {
    coffee:['components/coffee/tagline.coffee'],
    js : [
        'components/scripts/rclick.js',
        'components/scripts/pixgrid.js',
        'components/scripts/tagline.js',
        'components/scripts/template.js'
    ]
};

gulp.task('coffee', function() {
    gulp.src(sources.coffee)
        .pipe(coffee({bare: true})
            .on('error', gutil.log))
        .pipe(gulp.dest('components/scripts'))
});
gulp.task('js', function() {
    gulp.src(sources.js)
        .pipe(concat('script.js')
            .on('error', gutil.log))
        .pipe(gulp.dest('builds/development/js'))
});