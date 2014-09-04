var gulp = require('gulp'),
  watch = require('gulp-watch'),
  notify = require('gulp-notify'),
  sourcemaps = require('gulp-sourcemaps'),
  less = require('gulp-less'),
  minifyCSS = require('gulp-minify-css'),
  react = require('gulp-react'),
  bower = require('gulp-bower');

gulp.task('bower', function() {
  return bower()
    .pipe(notify("Bower dependencies installed"));
});

gulp.task('react', function() {
  gulp.src('./demo/jsx/*.jsx')
    .pipe(react()).on('error',function(e){
      this.end();
    })
    .pipe(gulp.dest('./demo/js/'))
    .pipe(notify("JSX compiled"));
});

gulp.task('less', function() {
  gulp.src('./demo/less/main.less')
    .pipe(sourcemaps.init())
    .pipe(less()).on('error',function(e){
      this.end();
    })
    .pipe(minifyCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./demo/css'))
    .pipe(notify("LESS compiled"));
});

gulp.task('watch', function () {
  gulp.watch('./demo/less/*.less', ['less']);
  gulp.watch('./demo/jsx/*.jsx', ['react']);
});

gulp.task('default',['bower','react','less']);