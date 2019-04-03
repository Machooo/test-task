  var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    concat       = require('gulp-concat'),
    concatCss    = require('gulp-concat-css');
    uglify       = require('gulp-uglifyjs'),
    cssnano      = require('gulp-cssnano'),
    rename       = require('gulp-rename'),
    del          = require('del'),
    imagemin     = require('gulp-imagemin'),
    jpgmin       = require('imagemin-jpegoptim'),
    pngmin       = require('imagemin-pngquant'),
    cache        = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    gih          = require("gulp-include-html"),
    deploy       = require('gulp-gh-pages');

gulp.task('sass', function(){
  return gulp.src('app/sass/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions', '> 1%']))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('build-html' , function(){
  return gulp.src("app/html/pages/*.html")
  .pipe(gih({
    baseDir:'app/html/'
  }))
  .pipe(gulp.dest("app"));
});

gulp.task('watch', ['browser-sync', 'build-html'], function() {
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/html/**/*.html', ['build-html']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('img', function() {
  return gulp.src('app/images/**/*')
  .pipe(cache(imagemin([
    imagemin.gifsicle({interlaced: true}),
    jpgmin({
      progressive: true,
      max: 85,
      stripAll: true
    }),
    pngmin({
      quality: '68'
    }),
    imagemin.svgo({
      plugins: [
        {removeViewBox: true},
        {cleanupIDs: false}
      ]
    })
  ])))

  .pipe(gulp.dest('dist/images'));
});

gulp.task('clear', function () {
    return cache.clearAll();
});


gulp.task('deploy', function () {
  return gulp.src("./dist/**/*")
    .pipe(deploy({
      remoteUrl: "https://github.com/Machooo/Machooo.github.io.git",
      branch: "master"
    }));
});


// Huyak huyak and to production
gulp.task('build', ['clean', 'clear', 'img', 'sass'], function() {

    var buildCss = gulp.src('app/css/**/*')
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));

});

gulp.task('default', ['watch']);
