var gulp          = require('gulp'),
    del           = require('del'),
    uglify        = require('gulp-uglify'),
    csso          = require('gulp-csso'),
    jsxbin        = require('jsxbin'),
    runSequence   = require('run-sequence'),
    yuicompressor = require('gulp-yuicompressor'),
    zxpSignCmd    = require('zxp-sign-cmd'),
    include       = require('gulp-include'),
    replace       = require('gulp-replace'),
    rename         = require('gulp-rename'),
    // folder vars
    destinationFolder   = 'Install/',
    sourceFolder        = 'src/',
    panelName           = 'Skelotron';
    compressed          = true;


gulp.task('clean', function () {
  return del([
    destinationFolder + '**/*'
  ]);
});

gulp.task('copy', ['clean'], function () {
  return gulp.src(sourceFolder + '/**/*')
        .pipe(gulp.dest(destinationFolder + panelName));
});

gulp.task('compress-js', function () {
    return gulp.src(destinationFolder + panelName + '/**/*.js')
    .pipe(uglify().on('error', function(e){
          console.log(e);
       }))
    .pipe(gulp.dest(destinationFolder + panelName));
});

gulp.task('compress-css', function () {
      return gulp.src(destinationFolder + panelName + '/**/*.css')
    .pipe(csso())
        .pipe(gulp.dest(destinationFolder + panelName));
});

gulp.task('compress-files', function (callback) {
  runSequence('copy', ['compress-css', 'compress-js', 'compress-jsx'], callback);
})

gulp.task('compress-jsx', function () {
    var fileIn = destinationFolder + panelName + '/jsx/script.jsx';
    return gulp.src(fileIn)
        .pipe(replace(/^\s*(#include|\/\/\s*@include)/gm, '//= include'))
        .pipe(include())
        .pipe(yuicompressor({
          'type'          : 'js',
          'preserve-semi' : true
        }))
        .pipe(gulp.dest(destinationFolder + panelName + '/jsx/'))
});

gulp.task('jsxbin', ['compress-jsx'], function () {
    var jsxFolder = destinationFolder + panelName + '/jsx/';
    var fileIn = jsxFolder + 'script.jsx';
    var fileOut = jsxFolder + 'script.jsxbin';
    return jsxbin(fileIn)
      .then(function () {
        del(fileIn);
      })
      .then(function () {
          return gulp.src(fileOut)
              .pipe(rename({
                  'extname' : '.jsx'
              }))
              .pipe(gulp.dest(jsxFolder));
      })
      .then(function () {
          del(fileOut)
          del(jsxFolder + 'libs')
      })
});

gulp.task('build', ['compress-files'], function (callback) {
	zxpSignCmd.sign({
    		'input'     : destinationFolder + panelName,
    		'output'    : destinationFolder + panelName + '.zxp',
		'cert'      : './cert.p12',
		'password'  : 'password',
		'timestamp' : 'http://timestamp.digicert.com'
	}, function (error, result) {
		callback();
	});
});

gulp.task('clean-intermediates', ['build'], function () {
  return del(
        destinationFolder + panelName
  );
});

gulp.task('default', ['clean-intermediates']);
