'use strict';
 
let gulp = require('gulp');
let sass = require('gulp-sass');
let babel = require('gulp-babel');
let sftp = require('gulp-sftp');

let jsSrc = './js/*.js';
let sassSrc = './sass/*.scss';
let uploadTree = './build/**'

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
    return gulp.src('*.html')
        .pipe(gulp.dest('./build'));
});

gulp.task('watch', ['sass:watch', 'js:watch']);

gulp.task('autoupload', () => {
    gulp.watch([uploadTree], ['upload']);
});

gulp.task('upload', () => {
    return gulp.src(uploadTree, { base: './build' })
        .pipe(sftp({
            host: 'blob',
            user: 'jleen',
            remotePath: '/srv/saturnvalley.org/www/oddsnends'
        }));
});
