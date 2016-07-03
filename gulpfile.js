var gulp      	= require('gulp'),
    ts          = require('gulp-typescript'),
    sass    	= require('gulp-sass'),
    minifyCss   = require('gulp-minify-css'),
    del			= require('del');
    
var paths = {
    appJavascript: ['**/*.ts', '!node_modules/**/*.*'],
    appScss: ['**/*.scss', '!node_modules/**/*.*']
}

// load configuration
var tsProject = ts.createProject('tsconfig.json'); 

gulp.task('ts', function() {
	var tsResult = tsProject.src(paths.appJavascript) 	// load all files from our pathspecification
		.pipe(ts(tsProject)); 							// transpile the files into .js
    
	return tsResult.js.pipe(gulp.dest(function(file) {
		return file.base;
	})); 			// save the .js in the same place as the original .ts-file
});

gulp.task('sass', function() {
  gulp.src(paths.appScss)
    .pipe(sass().on('error', sass.logError)) 			// this will prevent our future watch-task from crashing on sass-errors
    .pipe(minifyCss({compatibility: 'ie8'})) 			// see the gulp-sass doc for more information on compatibilitymodes
        .pipe(gulp.dest(function(file) {
            return file.base; 							// because of Angular 2's encapsulation, it's natural to save the css where the scss-file was
    }));
});

gulp.task('watch', ['sass', 'ts'], function() { 		// brackets makes sure we run ts and sass once before the watch starts
    gulp.watch(paths.appScss, ['sass']); 				// run the sass-task any time stuff in the appScss changes
    gulp.watch(paths.appJavascript, ['ts']); 			// run the ts-task any time stuff in appJavascript changes
});

// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del('dist/**/*');
});