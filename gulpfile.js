var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postHTML = require("gulp-posthtml");
var include = require("posthtml-include");
var autoprefixer = require('gulp-autoprefixer');
var minify = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var rename = require("gulp-rename");
var server = require("browser-sync").create();
var run = require("run-sequence");
var del = require("del");
var normalizeSCSS = require("node-normalize-scss");

gulp.task("style", function(){
    return gulp.src("source/sass/style.scss")
        .pipe(plumber())
        .pipe(sass({
            includePaths: normalizeSCSS.includePaths
          }))
        .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
        }))
        .pipe(gulp.dest("build/css"))
        .pipe(minify())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("build/css"))
        .pipe(server.stream());
});

gulp.task("sprite", function(){
    return gulp.src("source/img/sprite-*.svg")
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(rename("sprite.svg"))
        .pipe(gulp.dest("build/img/svg-sprite"));
});

gulp.task("html", function(){
    return gulp.src("source/*.html")
        .pipe(postHTML([include()]))
        .pipe(gulp.dest("build"))
});

gulp.task("images", function(){
    return gulp.src("source/img/**/*.{png,jpg,svg")
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.jpegtran({progressive: true}),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest("source/img/min"));
});

gulp.task("webp", function(){
    return gulp.src("source/img/**/*.{png,jpg}")
        .pipe(webp({quality: 90}))
        .pipe(gulp.dest("source/img/webp"));
});

gulp.task("serve", function(){
    server.init({
        server: "build/"
    });

    gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
    gulp.watch("source/js/**/*.js", ["copy"]);
    gulp.watch("source/*.html", ["html"]).on('change', server.reload);
});

gulp.task("copy", function(){
    return gulp.src([
        "source/fonts/**/*.{woff,woff2}",
        "source/img/**",
        "source/js/**"
    ], {
        base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function(){
    return del("build");
});

gulp.task("build", function(done){
    run(
        "clean",
        "copy",
        "style",
        "sprite",
        "html",
        done
    );
});