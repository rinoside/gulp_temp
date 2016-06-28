var gulp = require("gulp");

// sassファイル
var sass = require("gulp-sass");
// ベンダープレフィクス自動付与→勝手に消されるのでいったん停止
var autoprefixer = require("gulp-autoprefixer");
// スタイルガイド生成　frontnote
// var frontnote = require("gulp-frontnote");
// js圧縮
var uglify = require("gulp-uglify");
// ブラウザへの反映自動化browser-syncを使用。
// ファイルが変更されると画面を更新するだけでなく、スクロールやinputへの入力を全てのブラウザで同期してくれます。
var browser = require("browser-sync");
// エラーハンドリング
var plumber = require("gulp-plumber");
 
gulp.task("sass", function() {
    gulp.src("sass/**/*scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("./assets/stylesheets"))
        .pipe(browser.reload({stream:true}))
});

 
gulp.task("js", function() {
    gulp.src(["assets/javascripts/**/*.js","!assets/javascripts/min/**/*.js"])
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest("./assets/javascripts/min"))
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
    gulp.watch(["assets/javascripts/**/*.js","!assets/javascripts/min/**/*.js"],["js"]);
    gulp.watch("sass/**/*.scss",["sass"]);
});