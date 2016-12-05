var gulp = require("gulp");
var ejs = require("gulp-ejs");
var fs = require("fs");
// var sass = require("gulp-sass");
var browser = require("browser-sync");
var plumber = require('gulp-plumber'); 

gulp.task('server', function () { 
	browser({ 
	notify: false, 
	server: { baseDir: "./public" }}) 

	// ファイルが変更されたときにmakeを実行
	gulp.watch('src/**/*.ejs', ["make"]); 
	gulp.watch('public/**/*.html', browser.reload);
	// gulp.watch('**/**.js', browser.reload); 
});

gulp.task("make", function() {
	var json = JSON.parse(fs.readFileSync("./package.json"));

    gulp.src(
    	["./src/**/*.ejs", '!' + "./src/ejs/*"], 
    	{ base: 'src'}) //srcディレクトリの構造を維持)
    .pipe(ejs())
    .pipe(ejs(json, {"ext" : ".html"}))
    .pipe(gulp.dest("./public")); // 展開先

    gulp.src(
    	["./src/**/*", '!' + "./src/**/*.ejs",
        '!' + "./src/ejs/"],
    	{base : "src"})
    .pipe(gulp.dest("./public"));
});