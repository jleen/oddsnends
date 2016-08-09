'use strict';
 
let gulp = require('gulp');
let sass = require('gulp-sass');
let babel = require('gulp-babel');
let sftp = require('gulp-sftp');

let jsSrc = './js/*.js';
let sassSrc = './sass/*.scss';
let htmlSrc = './html/*.html';
let uploadTree = './build/**'

gulp.task('default', ['html', 'js', 'sass']);
gulp.task('watch', ['sass:watch', 'js:watch', 'html:watch']);

gulp.task('sass', () => {
    return gulp.src(sassSrc)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css'));
});
 
gulp.task('sass:watch', () => {
    gulp.watch(sassSrc, ['sass']);
});

gulp.task('js', () => {
    gulp.src(jsSrc)
        .pipe(babel())
        .pipe(gulp.dest('./build'));
});

gulp.task('js:watch', () => {
    gulp.watch(jsSrc, ['js']);
});

gulp.task('html', () => {
    return gulp.src(htmlSrc)
        .pipe(gulp.dest('./build'));
});

gulp.task('html:watch', () => {
    gulp.watch(htmlSrc, ['html']);
});

gulp.task('watch', ['sass:watch', 'js:watch', 'html:watch']);

gulp.task('autoupload', ['watch'], () => {
    gulp.watch([uploadTree], ['upload']);
});

gulp.task('upload', ['default'], () => {
    return gulp.src(uploadTree, { base: './build' })
        .pipe(sftp({
            host: 'blob',
            user: 'jleen',
            remotePath: '/srv/saturnvalley.org/www/oddsnends'
        }));
});
