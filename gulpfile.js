let gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    sass = require('gulp-sass'),
    minify = require('gulp-clean-css'),
    hash = require('gulp-hash'),
    concat = require('gulp-concat-css')

let styles = ['styles/styles.scss'],
    destination = 'build';


gulp.task('clean', function () {
    return del(['build/*'])
});

gulp.task('styles', function () {
    return gulp.src(styles)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(destination));
});

gulp.task('sass-debugger', function () {
    return gulp.src("styles/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(destination));
});

gulp.task('sass-release', function () {
    return gulp.src("styles/*.scss")
        .pipe(sass())
        .pipe(concat("styles.min.css"))
        .pipe(minify())
        .pipe(hash())
        .pipe(gulp.dest(destination));
});


gulp.task('watch', gulp.series('styles', function () {
    return gulp.watch(['styles/**/*.scss'],
           gulp.series('styles'));
}));


