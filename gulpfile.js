const gulp = require('gulp');
const minify = require('gulp-minify');
const concat = require('gulp-concat');
const { series } = require('gulp');

const compress= function(cb) {
  return gulp.src(['lib/*.js', 'lib/*.mjs'])
    .pipe(concat('correntlyElements.js'))
    .pipe(minify())
    .pipe(gulp.dest('dist'));
    const { exec } = require('child_process');
    exec("./node_modules/.bin/esdoc", (error, stdout, stderr) => {
      console.log(error,stdout,stderr);
      cb();
    });
};
const compressPWA= function(cb) {
  return gulp.src(['pwa/*.js', 'pwa/*.mjs'])
    .pipe(concat('correntlyElementsWorker.js'))
    .pipe(minify())
    .pipe(gulp.dest('dist'));
    const { exec } = require('child_process');
    exec("./node_modules/.bin/esdoc", (error, stdout, stderr) => {
      console.log(error,stdout,stderr);
      cb();
    });
};

const concatenate= function(cb) {
  return gulp.src(['dist/*.min.js'])
    .pipe(gulp.dest('dist'));
    cb();
};


exports.default = series([compress,compressPWA]);
