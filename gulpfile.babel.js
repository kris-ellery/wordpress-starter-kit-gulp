'use strict'

/**
 * Import dependencies
 * -----------------------------------------------------------------------------
 */

import autoprefixer from 'autoprefixer'
import babel from 'gulp-babel'
import bs from 'browser-sync'
import changed from 'gulp-changed'
import del from 'del'
import eslint from 'gulp-eslint'
import gulp from 'gulp'
import header from 'gulp-header'
import include from 'gulp-include'
import nano from 'gulp-cssnano'
import pkg from './package.json'
import postcss from 'gulp-postcss'
import rename from 'gulp-rename'
import sass from 'gulp-sass'
import sequence from 'run-sequence'
import uglify from 'gulp-uglify'

/**
 * Set meta banner
 * -----------------------------------------------------------------------------
 */

const banner = [
  '/**',
  ' * Theme Name: <%= pkg.title %>',
  ' * Theme URI: <%= pkg.homepage %>',
  ' * Author: <%= pkg.author.name %>',
  ' * Author URI: <%= pkg.author.url %>',
  ' * Description: <%= pkg.description %>',
  ' * Version: <%= pkg.version %>',
  ' * License: <%= pkg.license %>',
  ' */',
  '\n'
].join('\n');

/**
 * Set paths
 * -----------------------------------------------------------------------------
 */

const path = {
  build: 'build/wp-content/themes/' + pkg.name,
  src: 'src'
}

/**
 * Default task
 * -----------------------------------------------------------------------------
 */

gulp.task('default', (callback) => {
  return sequence(
    [ 'build' ],
    [ 'server' ],
    callback
  )
})

/**
 * Local dev server with live reload
 * -----------------------------------------------------------------------------
 */

gulp.task('server', () => {
  // Create and initialize local server
  bs.create()
  bs.init({
    notify: false,
    proxy : 'localhost:8888',
    host: 'localhost',
    open: 'local',
    ui: false
  })

  // Watch for build changes and reload browser
  bs.watch(path.build + '/**/*').on('change', bs.reload)

  // Watch for source changes and execute associated tasks
  gulp.watch('./src/data/**/*', [ 'data' ])
  gulp.watch('./src/fonts/**/*', [ 'fonts' ])
  gulp.watch('./src/images/**/*', [ 'images' ])
  gulp.watch('./src/media/**/*', [ 'media' ])
  gulp.watch('./src/misc/**/*', [ 'misc' ])
  gulp.watch('./src/scripts/**/*.js', [ 'scripts' ])
  gulp.watch('./src/styles/**/*.scss', [ 'styles' ])
  gulp.watch('./src/vendors/*.js', [ 'vendors' ])
  gulp.watch('./src/views/**/*.php', [ 'views' ])
})

/**
 * Build static assets
 * -----------------------------------------------------------------------------
 */

gulp.task('build', (callback) => {
  return sequence(
    [ 'clean' ],
    [ 'assets' ],
    [ 'scripts' ],
    [ 'styles' ],
    [ 'vendors' ],
    [ 'views' ],
    callback
  )
})

/**
 * Remove build directory
 * -----------------------------------------------------------------------------
 */

gulp.task('clean', () => {
  return del('./' + path.build)
})

/**
 * Assets
 * -----------------------------------------------------------------------------
 */

gulp.task('assets', (callback) => {
  return sequence(
    [ 'data' ],
    [ 'fonts' ],
    [ 'images' ],
    [ 'media' ],
    [ 'misc' ],
    [ 'meta' ],
    callback
  )
})

/**
 * Copy data files
 * -----------------------------------------------------------------------------
 */

gulp.task('data', () => {
  return gulp

    // Select files
    .src(path.src + '/data/**/*')

    // Check for changes
    .pipe(changed(path.build + '/data'))

    // Save files
    .pipe(gulp.dest(path.build + '/data'))
})

/**
 * Copy font files
 * -----------------------------------------------------------------------------
 */

gulp.task('fonts', () => {
  return gulp

    // Select files
    .src(path.src + '/fonts/**/*')

    // Check for changes
    .pipe(changed(path.build + '/fonts'))

    // Save files
    .pipe(gulp.dest(path.build + '/fonts'))
})

/**
 * Copy image files
 * -----------------------------------------------------------------------------
 */

gulp.task('images', () => {
  return gulp

    // Select files
    .src(path.src + '/images/**/*')

    // Check for changes
    .pipe(changed(path.build + '/images'))

    // Save files
    .pipe(gulp.dest(path.build + '/images'))
})

/**
 * Copy media files
 * -----------------------------------------------------------------------------
 */

gulp.task('media', () => {
  return gulp

    // Select files
    .src(path.src + '/media/**/*')

    // Check for changes
    .pipe(changed(path.build + '/media'))

    // Save files
    .pipe(gulp.dest(path.build + '/media'))
})

/**
 * Copy misc files
 * -----------------------------------------------------------------------------
 */

gulp.task('misc', () => {
  return gulp

    // Select files
    .src(path.src + '/misc/**/*', { dot: true })

    // Check for changes
    .pipe(changed(path.build))

    // Save files
    .pipe(gulp.dest(path.build))
})

/**
 * Set meta information
 * -----------------------------------------------------------------------------
 */

gulp.task('meta', () => {
  return gulp

    // Select files
    .src(path.build + '/style.css')

    // Set WordPress compliant meta banner
    .pipe(header(banner, {
      pkg: pkg
    }))

    // Save files
    .pipe(gulp.dest(path.build))
})

/**
 * Build scripts with transpilers
 * -----------------------------------------------------------------------------
 */

gulp.task('scripts', [ 'scripts-lint' ], () => {
  return gulp

    // Select files
    .src(path.src + '/scripts/*.js')

    // Concatenate includes
    .pipe(include())

    // Transpile
    .pipe(babel({
			presets: [ 'es2015' ]
		}))

    // Add meta banner
    .pipe(header(banner, {
      pkg: pkg
    }))

    // Save unminified file
    .pipe(gulp.dest(path.build + '/scripts'))

    // Optimize and minify
    .pipe(uglify({
      preserveComments: 'some'
    }))

    // Append suffix
    .pipe(rename({
      suffix: '.min'
    }))

    // Save minified file
    .pipe(gulp.dest(path.build + '/scripts'))
})

/**
 * Lint scripts
 * -----------------------------------------------------------------------------
 */

gulp.task('scripts-lint', () => {
  return gulp

    // Select files
    .src(path.src + '/scripts/**/*.js')

    // Check for errors
    .pipe(eslint())

    // Format errors
    .pipe(eslint.format())

    // Fail on errors
    .pipe(eslint.failOnError())
})

/**
 * Build styles with pre-processors and post-processors
 * -----------------------------------------------------------------------------
 */

gulp.task('styles', () => {
  return gulp

    // Select files
    .src(path.src + '/styles/*.scss')

    // Compile Sass
    .pipe(sass({
      outputStyle: 'expanded'
    }))

    // Add vendor prefixes
    .pipe(postcss([
      require('autoprefixer')
    ]))

    // Add meta banner
    .pipe(header(banner, {
      pkg: pkg
    }))

    // Save unminified file
    .pipe(gulp.dest(path.build + '/styles'))

    // Optimize and minify
    .pipe(nano({
      zindex: false,
      reduceIdents: false,
      mergeIdents: false
    }))

    // Append suffix
    .pipe(rename({
      suffix: '.min'
    }))

    // Save minified file
    .pipe(gulp.dest(path.build + '/styles'))
})

/**
 * Bundle vendors
 * -----------------------------------------------------------------------------
 */

gulp.task('vendors', () => {
  return gulp

    // Select files
    .src(path.src + '/vendors/*.js')

    // Concatenate includes
    .pipe(include())

    // Save files
    .pipe(gulp.dest(path.build + '/vendors'))
})


/**
 * Build views with pre-processors
 * -----------------------------------------------------------------------------
 */

gulp.task('views', () => {
  return gulp

    // Select files
    .src(path.src + '/views/**/*')

    // Only copy modified files
    .pipe(changed(path.build))

    // Save files
    .pipe(gulp.dest(path.build))
})
