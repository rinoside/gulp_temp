var gulp = require("gulp");


// sassファイル
var sass = require("gulp-sass");
// ベンダープレフィクス自動付与
var autoprefixer = require("gulp-autoprefixer");
// js圧縮
var uglify = require("gulp-uglify");
// ブラウザへの反映自動化browser-syncを使用。
// ファイルが変更されると画面を更新するだけでなく、スクロールやinputへの入力を全てのブラウザで同期。
var browser = require("browser-sync");
// エラーハンドリング
var plumber = require("gulp-plumber");
// ejs
var ejs = require('gulp-ejs');
// スプライト画像
var spritesmith = require('gulp.spritesmith');

gulp.task("sass", function() {
    gulp.src("sass/**/*scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("./css"))
        .pipe(browser.reload({stream:true}))
});
 
gulp.task("js", function() {
    gulp.src(["js/**/*.js","!js/min/**/*.js"])
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest("./js/min"))
        .pipe(browser.reload({stream:true}))
});

// ブラウザへの反映自動化
gulp.task("server", function() {
    browser({
        server: {
            baseDir: "./"
        }
    });
});

// 自動実行
gulp.task("default",['server'], function() {
    gulp.watch(["js/**/*.js","!js/min/**/*.js"],["js"]);
    gulp.watch("sass/**/*.scss",["sass"]);
});

// ejs
gulp.task("ejs", function() {
    gulp.src(
        ["app/dev/ejs/**/*.ejs",'!' + "app/dev/ejs/**/_*.ejs"] //注1
    )
        .pipe(ejs())
        .pipe(gulp.dest("./")) //注2
});

// スプライト
gulp.task('sprite', function () {
  var spriteData = gulp.src('images/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: '_sprite.scss',
    imgPath: '../images/sprite/sprite.png',
    cssFormat: 'scss', 
    cssVarMap: function (sprite) {
      sprite.name = 'sprite-' + sprite.name;
    }
  }));
   
  spriteData.img
    .pipe(gulp.dest('images/sprite/'));
 
  spriteData.css
    .pipe(gulp.dest('sass/'));
});