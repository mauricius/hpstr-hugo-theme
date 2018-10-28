var del          = require("del"),
    gulp         = require("gulp"),
    noop         = require("gulp-noop"),
    sass         = require("gulp-sass"),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    autoprefixer = require("gulp-autoprefixer")

var isDebug = ((process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production')

gulp.task('clean:dist', function() {
  return del.sync("static/dist")
})

gulp.task("production", ["scss", "js"])

gulp.task("scss", function () {
    gulp.src("static/scss/**/*.scss")
        .pipe(isDebug ? noop() : sass({ outputStyle : "compressed" }))
        .pipe(isDebug ? sass().on('error', sass.logError) : noop())
        .pipe(autoprefixer({
            browsers : ["last 20 versions"]
        }))
        .pipe(gulp.dest("static/dist/css"))
})

gulp.task("js", function () {
    gulp.src(["static/js/**/*.js", "!static/js/vendor/*.js"])
        .pipe(concat('scripts.min.js'))
        .pipe(isDebug ? noop() : uglify())
        .pipe(gulp.dest("static/dist/js"))
        .on('error', function (err) { console.log(err) })
})

gulp.task("watch", ["scss", "js"], function () {
    gulp.watch("static/scss/**/*", ["scss"])
    gulp.watch("static/js/**/*", ["js"])
})

gulp.task("default", ["watch"])