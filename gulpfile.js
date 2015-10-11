/**
 * Gulp
 * -----------------------------------------------------------------------------
 */

'use strict';

// Constants
var THEME_NAME = "custom-theme";

// Dependencies
var gulp         = require('gulp');
var plumber      = require('gulp-plumber');
var gutil        = require('gulp-util');
var requireDir   = require('require-dir');
var runSequence  = require('run-sequence');
var del          = require('del');
var changed      = require('gulp-changed');
var imagemin     = require('gulp-imagemin');
var watch        = require('gulp-watch');
var bs           = require("browser-sync").create();
var scsslint     = require('gulp-scss-lint');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csscomb      = require('gulp-csscomb');
var combineMq    = require('gulp-combine-mq');
var minifyCss    = require('gulp-minify-css');
var include      = require('gulp-include');
var rename       = require('gulp-rename');
var header       = require('gulp-header');
var moment       = require('moment');
var jscs         = require('gulp-jscs');
var jshint       = require('gulp-jshint');
var stylish      = require('jshint-stylish');
var uglify       = require('gulp-uglify');
var jshintConfig = require('./_js-lint.json');
var pkg          = require('./package.json');
var banner       = '/*! <%= pkg.title %> | <%= moment().format("MMMM Do YYYY, h:mm:ss A") %> */\n';

/**
 * Error handling
 * -----------------------------------------------------------------------------
 */
var gulp_src = gulp.src;

gulp.src = function() {
  return gulp_src
    .apply(gulp, arguments)
    .pipe(plumber(function(error) {
      gutil.log(gutil.colors.red(
        'Error (' + error.plugin + '): ' + error.message
      ));
      this.emit('end');
    }));
};

/**
 * Task: Default
 * -----------------------------------------------------------------------------
 */

gulp.task('default', function(cb) {
  return runSequence(
    [ 'build' ],
    [ 'server' ],
    cb
  );
});

/**
 * Task: Build
 * -----------------------------------------------------------------------------
 */

gulp.task('build', function(cb) {
  return runSequence(
    [ 'remove-build' ],
    [ 'assets' ],
    [ 'scripts' ],
    [ 'styles' ],
    [ 'views' ],
    cb
  );
});

gulp.task('remove-build', function() {
  return del('./build/wp-content/themes/' + THEME_NAME);
});

/**
 * Task: Server
 * -----------------------------------------------------------------------------
 */

gulp.task('server', function() {

  // Start BrowserSync server
  bs.init({
    notify: false,
    proxy : 'localhost:8888',
    host  : 'localhost',
    open  : 'local',
    ui    : false
  });

  // Watch for `build` file changes and reload browser
  bs.watch('build/wp-content/themes/' + THEME_NAME + '/**/*').on('change', bs.reload);

  // Watch for `source` file changes and run appropriate task
  gulp.watch('source/data/**/*', [ 'data' ]);
  gulp.watch('source/fonts/**/*', [ 'fonts' ]);
  gulp.watch('source/images/**/*', [ 'images' ]);
  gulp.watch('source/media/**/*', [ 'media' ]);
  gulp.watch('source/misc/**/*', [ 'misc' ]);
  gulp.watch('source/scripts/**/*', [ 'scripts' ]);
  gulp.watch('source/styles/**/*', [ 'styles' ]);
  gulp.watch('source/vendors/**/*', [ 'vendors' ]);
  gulp.watch('source/views/**/*', [ 'views' ]);
});

/**
 * Task: Assets
 * -----------------------------------------------------------------------------
 */

// All assets
gulp.task('assets', function(cb) {
  return runSequence(
    [ 'data' ],
    [ 'fonts' ],
    [ 'images' ],
    [ 'media' ],
    [ 'misc' ],
    [ 'vendors' ],
    cb
  );
});

gulp.task('data', function() {
  return gulp
    .src('./source/data/**/*')
    .pipe(changed('./build/wp-content/themes/' + THEME_NAME + '/data'))
    .pipe(gulp.dest('./build/wp-content/themes/' + THEME_NAME + '/data'));
});

gulp.task('fonts', function() {
  return gulp
    .src('./source/fonts/**/*')
    .pipe(changed('./build/wp-content/themes/' + THEME_NAME + '/fonts'))
    .pipe(gulp.dest('./build/wp-content/themes/' + THEME_NAME + '/fonts'));
});

gulp.task('images', function () {
  return gulp
    .src('./source/images/**/*')
    .pipe(changed('./build/wp-content/themes/' + THEME_NAME + '/images'))
    .pipe(imagemin({
      optimizationLevel: 4,
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }]
    }))
    .pipe(gulp.dest('./build/wp-content/themes/' + THEME_NAME + '/images'));
});

gulp.task('media', function() {
  return gulp
    .src('./source/media/**/*')
    .pipe(changed('./build/wp-content/themes/' + THEME_NAME + '/media'))
    .pipe(gulp.dest('./build/wp-content/themes/' + THEME_NAME + '/media'));
});

gulp.task('misc', function() {
  return gulp
    .src('./source/misc/**/*', { dot: true })
    .pipe(changed('./build/wp-content/themes/' + THEME_NAME))
    .pipe(gulp.dest('./build/wp-content/themes/' + THEME_NAME));
});

gulp.task('vendors', function() {
  return gulp
    .src('./source/vendors/**/*')
    .pipe(changed('./build/wp-content/themes/' + THEME_NAME + '/vendors'))
    .pipe(gulp.dest('./build/wp-content/themes/' + THEME_NAME + '/vendors'));
});

/**
 * Task: Scripts
 * -----------------------------------------------------------------------------
 */

gulp.task('scripts', function() {
  return gulp
    .src('./source/scripts/*.js')
    .pipe(include())
    .pipe(jscs({
      configPath: './_js-guide.json'
    }))
    .pipe(jshint(jshintConfig))
    .pipe(jshint.reporter(stylish))
    .pipe(header(banner, {
      pkg: pkg,
      moment: moment
    }))
    .pipe(gulp.dest('./build/wp-content/themes/' + THEME_NAME + '/scripts'))
    .pipe(uglify({
      preserveComments: 'some'
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./build/wp-content/themes/' + THEME_NAME + '/scripts'));
});

/**
 * Task: Styles
 * -----------------------------------------------------------------------------
 */

gulp.task('styles', function(cb) {
  return runSequence(
    [ 'styles-lint' ],
    [ 'styles-build' ],
    cb
  );
});

gulp.task('styles-lint', function() {
  return gulp
    .src('./source/styles/**/*.scss')
    .pipe(scsslint({
      config: './_sass-lint.yml'
    }));
});

gulp.task('styles-build', function() {
  return gulp
    .src('./source/styles/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(autoprefixer({
      browsers: [ 'last 2 versions' ]
    }))
    .pipe(csscomb({
      configPath: './_css-comb.json'
    }))
    .pipe(header(banner, {
      pkg: pkg,
      moment: moment
    }))
    .pipe(gulp.dest('./build/wp-content/themes/' + THEME_NAME + '/styles'))
    .pipe(combineMq())
    .pipe(minifyCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./build/wp-content/themes/' + THEME_NAME + '/styles'));
});

/**
 * Task: Views
 * -----------------------------------------------------------------------------
 */

gulp.task('views', function() {
  return gulp
    .src('./source/views/**/*')
    .pipe(changed('./build/wp-content/themes/' + THEME_NAME))
    .pipe(gulp.dest('./build/wp-content/themes/' + THEME_NAME));
});
