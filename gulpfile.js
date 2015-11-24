/**
 * Created by severjason on 18.11.2015.
 */
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffie = require('gulp-coffee');

var sources = {
    coffee:['components/coffee/tagline.coffee']
};

gulp.task('coffee', function() {
    gulp.src(sources.coffee)
        .pipe(coffie({bare: true})
            .on('error', gutil.log))
        .pipe(gulp.dest('components/scripts'))
});