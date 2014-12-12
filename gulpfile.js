var gulp = require('gulp'),
    gutil = require('gulp-util'),
    stylish = require('jshint-stylish'),
    jshint = require('gulp-jshint'),
    w3cjs = require('gulp-w3cjs'),
    prettify = require('gulp-jsbeautifier'),
    webserver = require('gulp-webserver');

gulp.task('js', function() {
  return gulp.src('builds/development/js/myscript.js')
    .pipe(jshint('./.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('html', function() {
    gulp.src('builds/development/*.html')
        .pipe(w3cjs());
});

gulp.task('css', function() {
    gulp.src('builds/development/css/*.css')
});

gulp.task('watch', function() {
    gulp.watch('builds/development/js/**/*', ['js']);
    gulp.watch('builds/development/css/*.css', ['css']);
    gulp.watch(['builds/development/*.html',
        'builds/development/views/*.html'
    ], ['html']);
});

gulp.task('webserver', function() {
    gulp.src('builds/development/')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task('default', ['watch', 'html', 'js', 'css', 'webserver']);
