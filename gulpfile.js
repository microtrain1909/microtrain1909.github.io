var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify-es').default;
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var scss = require('gulp-sass');

/**
 * Define the paths upon which the files to be *gulped* will resided.
 * # styles - the name of a collection (this can be anything you like)
 * # src - the files to be gulped, multiple paths would be listed inside of an 
 * array
 * # dest - the output location
 * 
 */
var paths = {
  styles: {
    src: 'src/scss/**.scss',
    dest: 'dist/css/',
  }
};

/**
 * Define our tasks using plain functions
 */
function buildCSS() {
  return gulp.src(paths.styles.src)
    .pipe(scss())
    .pipe(cleanCSS())
    // pass in options to the stream
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest));
}

/**
 * Define a list of tasks to be executed when `gulp watch` is executed.s
 */
function watch() {
  gulp.watch(paths.styles.src, buildCSS);
}

exports.buildCSS = buildCSS;
exports.watch = watch;

/**
 * Specify if tasks run in series or parallel using `gulp.series` and 
 * `gulp.parallel`
 */
var build = gulp.series(gulp.parallel(buildCSS));

/**
 * Create a list of tasks that can be ran manually
 * Running `gulp styles` fom the cli would execute the styles task
 */
gulp.task('build', build);

/**
 * Define default task that can be called by just running `gulp` from cli
 * this would be the same as running `gulp watch`
 */
gulp.task('default', watch);
