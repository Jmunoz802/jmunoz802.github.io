var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var babel = require('gulp-babel');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var pkg = require('./package.json');

// Set the banner content
var banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> \n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' */\n',
  ''
].join('');

const compileStyle = () => {
  return gulp.src('scss/*.scss')
  .pipe(sass())
  .pipe(cleanCSS({
    compatibility: 'ie10'
  }))
  .pipe(concat('style.min.css'))
  .pipe(header(banner, {
    pkg: pkg
  }))
  .pipe(gulp.dest('css'))
  .pipe(browserSync.reload({
    stream: true
  }))
}

const watchStyle = () => {
  gulp.watch('scss/*.scss', compileStyle);
}

const processSCSS = () => {
  return gulp.src('scss/*.scss')
  .pipe(sass())
  .pipe(header(banner, {
    pkg: pkg
  }))
  .pipe(gulp.dest('css'))
  .pipe(browserSync.reload({
    stream: true
  }))
}

// Compiles SCSS files from /scss into /css
gulp.task('sass', processSCSS);

const minifyCSS = () => {
  return gulp.src(['css/*.css', '!css/*.min.css'])
  .pipe(cleanCSS({
    compatibility: 'ie10'
  }))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('css'))
  .pipe(browserSync.reload({
    stream: true
  }))
}

// Minify compiled CSS
gulp.task('minify-css', gulp.series('sass', minifyCSS));

const concatCSS = () => {
  return gulp.src(['css/*.min.css', '!css/style.min.css'])
  .pipe(concat('style.min.css'))
  .pipe(gulp.dest('css'))
  .pipe(browserSync.reload({
    stream: true
  }))
}

gulp.task('concat-css', gulp.series('minify-css', concatCSS));

const compileScript = () => {
  return gulp.src(['js/*.js', '!js/*.min.js'])
  .pipe(uglify())
  .pipe(header(banner, {
    pkg: pkg
  }))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('js'))
  .pipe(browserSync.reload({
    stream: true
  }))
}

const watchScript = () => {
  gulp.watch(['js/*.js', '!js/*.min.js'], compileScript);
}

const watchMarkup = () => {
  gulp.watch('*.html', () => {browserSync.reload({stream: true})});
}

const browser = () => {
  browserSync.init({
    server: {
      baseDir: './',
      single: "true"
    },
  })
}

// Configure the browserSync task
gulp.task('browserSync', browser)

// Dev task with browserSync
// gulp.task('dev', ['browserSync', 'sass', 'minify-css', 'minify-js'], function() {
//   gulp.watch('scss/*.scss', ['sass']);
//   gulp.watch('css/*.css', ['minify-css', 'concat-css']);
//   gulp.watch('js/*.js', ['minify-js']);
//   // Reloads the browser whenever HTML or JS files change
//   gulp.watch('*.html', browserSync.reload);
//   gulp.watch('js/*.js', browserSync.reload);
// });

// Default task
// gulp.task('default', ['sass', 'minify-css', 'minify-js', 'copy', 'concat-css'], function(){});

const compile = gulp.parallel(compileStyle, compileScript) 
const watch = gulp.parallel(watchStyle, watchMarkup, watchScript)
const serve = gulp.series(compile, browser)

const defaultTasks = gulp.parallel(watch, serve)

export {
  compile,
  compileScript,
  compileStyle,
  watch,
  watchMarkup,
  watchScript,
  watchStyle,
  serve
}

export default defaultTasks