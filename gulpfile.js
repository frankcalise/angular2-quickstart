var gulp      	= require('gulp'),
    sass    	= require('gulp-sass'),
    minifyCss   = require('gulp-minify-css');    

var PATHS = {
    src: ['**/*.ts', '!node_modules/**/*.*'],
    appScss: ['**/*.scss', '!node_modules/**/*.*']
}

gulp.task('ts', function () {
	var typescript = require('gulp-typescript');
	var tscConfig = require('./tsconfig.json');
	
    var tsResult = gulp
        .src(PATHS.src)
        .pipe(typescript(tscConfig.compilerOptions));

    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
  gulp.src(PATHS.appScss)
    .pipe(sass().on('error', sass.logError)) 			// this will prevent our future watch-task from crashing on sass-errors
    .pipe(minifyCss({compatibility: 'ie8'})) 			// see the gulp-sass doc for more information on compatibilitymodes
        .pipe(gulp.dest(function(file) {
            return 'dist/' + file.base; 							// because of Angular 2's encapsulation, it's natural to save the css where the scss-file was
    }));
});

gulp.task('watch', ['sass', 'ts'], function() { 		// brackets makes sure we run ts and sass once before the watch starts
    gulp.watch(PATHS.appScss, ['sass']); 				// run the sass-task any time stuff in the appScss changes
    gulp.watch(PATHS.src, ['ts']); 			// run the ts-task any time stuff in src changes
});

// clean the contents of the distribution directory
gulp.task('clean', function (done) {
	var del = require('del');
  	del(['dist'], done);
});

// set default task
gulp.task('default', ['watch']);