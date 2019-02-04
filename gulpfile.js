"use strict";

const gulp   	 = require('gulp'),
	concat       = require('gulp-concat'),
	uglify       = require('gulp-uglify'),
	rename       = require('gulp-rename'),
	sass         = require('gulp-sass'),
	maps         = require('gulp-sourcemaps'),
	del          = require('del'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync  = require('browser-sync').create(),
	imagemin 	 = require('gulp-imagemin'),
	htmlreplace  = require('gulp-html-replace'),
	pug   = require('gulp-pug'),
	cssmin       = require('gulp-cssmin');

const pathDev 	 = { 	
						root:'_dev/',
						js  :'_dev/js/',
						css :'_dev/css/',
						img :'_dev/images/',
						temp:'_dev/templates/',
					}
const pathPublic = { 	
						root:'_public/',
						js  :'_public/js/',
						css :'_public/css/',
						img :'_public/images/',
					}

/* JS */
gulp.task("concatScripts", function() {
	return gulp.src([
						pathDev.js+'vendor/jquery-3.3.1.slim.min.js',
						pathDev.js+'vendor/popper.min.js',
						pathDev.js+'vendor/bootstrap.min.js',
						pathDev.js+'custom/functions.js'
					])
		.pipe(maps.init())
		.pipe(concat('main.js'))
		.pipe(maps.write('.'))
		.pipe(gulp.dest(pathPublic.js));
});

gulp.task("minifyScripts", function() {
  return gulp.src(pathPublic.js+'main.js')
	  .pipe(uglify())
	  .pipe(rename('main.min.js'))
	  .pipe(gulp.dest(pathPublic.js));
});


/* SCSS/CSS */
gulp.task('compileSass', function() {
  return gulp.src(pathDev.css+"main.scss")
    .pipe(maps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(maps.write('.'))
    .pipe(gulp.dest(pathPublic.css));
});

gulp.task("minifyCss", function() {
  return gulp.src(pathPublic.css+"main.css")
    .pipe(cssmin())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(pathPublic.css));
});


/* IMAGES */
gulp.task('compressImages', function(){
  return gulp.src([pathDev.img+'*', pathDev.img+'mockup-assets/*'])
	.pipe(imagemin( [	imagemin.gifsicle({interlaced: true}),
					    imagemin.jpegtran({progressive: true}),
					    imagemin.optipng({optimizationLevel: 5}),
					    imagemin.svgo({ plugins: [ 	
					    				{removeViewBox: true},
					    				{cleanupIDs: false}
					        		]})
					]))
	.pipe(gulp.dest(pathPublic.img))
});


/* HTML TEMPLATES */
gulp.task('pug', function() {  
  return gulp.src(pathDev.temp+'*.pug')
	.pipe(pug({
		pretty: true
	}))
	.pipe(gulp.dest(pathPublic.root));
});


/* BUILD */
gulp.task('clean', function(done) {
  del([ pathPublic.root, pathDev.css+'main.css*', pathDev.js+'main*.js*']);
  done();
});

gulp.task("build", gulp.series('compressImages', 'concatScripts', 'minifyScripts', 'compileSass', 'minifyCss', 'pug' ), function() {
  return gulp.src(	[ pathPublic.root+'*.html', pathPublic.root+'favicon.ico', pathDev.img+'**' ], { base: './'} )
			 .pipe(gulp.dest(pathPublic.root));
});


/* WATCH */
gulp.task('watchFiles', function() {
	browserSync.init({
		server: pathPublic.root,
		open: true
	});

	gulp.watch( pathDev.css+'**/*', gulp.series('compileSass', 'minifyCss') );
	gulp.watch( pathDev.js+'**/*', gulp.series('concatScripts', 'minifyScripts') );
	gulp.watch( pathDev.img+'**/*', gulp.series('compressImages') );
	gulp.watch( pathDev.temp+'**/*', gulp.series('pug') );

	// if any public rescoures generated/changed lets reload
	gulp.watch( pathPublic.root+'**/*' ).on('change', browserSync.reload );

  


});


/* RUN */
	/* gulp - start watch */
gulp.task('default', gulp.series( 'watchFiles') );

	/* gulp dist - rebuild the '_public' */
gulp.task("dist", gulp.parallel('clean','build'));