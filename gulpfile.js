'use strict';
 
let gulp = require('gulp');
let sass = require('gulp-sass');
let babel = require('gulp-babel');
let sftp = require('gulp-sftp');

gulp.task('sass', () => {
    return gulp.src('./sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});
 
gulp.task('sass:watch', () => {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('js', () => {
    gulp.src('./*.js6')
        .pipe(babel())
        .pipe(gulp.dest('.'));
});

gulp.task('js:watch', () => {
    gulp.watch('./*.js6', ['js']);
});

gulp.task('watch', ['sass:watch', 'js:watch']);

gulp.task('autoupload', () => {
    gulp.watch(['./*.html', './*.js', './css/*.css'], ['upload']);
});

gulp.task('upload', () => {
    return gulp.src(['./*.html', './*.js', './css/*.css'], { base: '.' })
        .pipe(sftp({
            host: 'blob',
            user: 'jleen',
            remotePath: '/srv/saturnvalley.org/www/oddsnends'
        }));
});
