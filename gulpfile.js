var package = require('./package.json');


var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var del = require('del');
var fs = require('fs');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence').use(gulp);

var gutil  = require('gulp-util'); 
var colors = gutil.colors;
var argv = require('yargs').argv;

// Set default build mode
var mode = (argv.mode=='production' ? 'production' : 'development');

//Start build
log(colors.magenta(colors.bold('Name:  ' + package.name)))
log(colors.magenta(colors.bold('Build: ' + mode)) + '\n\n');


// Clean out the public directory
gulp.task('clean', function (cb) {
	log('>>> cleaning public directory', 'red,bold');
	del(['public/*']).then(function(){
		cb();
	});

});


/**
 * APP Build
 */

// Compile
gulp.task('build::app', function(cb) {

	return browserify({
			    entries: 'src/app/main.jsx',
			    extensions: ['.jsx'],
			    debug: true
			})
			.transform(babelify, {presets: ['react', 'es2015']})
			.bundle()
			.pipe(source('app.js'))
			.pipe(gulp.dest('public/js'))
});

// Uglify/Minify
gulp.task('build::uglify', ['build::app'], function (cb) {

	return gulp.src('public/js/app.js')
	           .pipe(uglify({ preserveComments: false, compress: { warnings: false }}))
	           .pipe(rename('app.min.js'))
	           .pipe(gulp.dest('public/js/'));

});


// Production Build
gulp.task('production', function(cb) {

	log('[     PRODUCTION BUILD STARTED...     ]', 'bgCyan,white,bold');
	
	runSequence('build::uglify', function() {

		log('[     PRODUCTION BUILD COMPLETE     ]', 'bgGreen,white,bold');
		cb();
	});
	
});

// Production Build
gulp.task('development', function(cb) {

	log('[     DEVELOPMENT BUILD STARTED...     ]', 'bgCyan,white,bold');

	runSequence('build::app', function() {


		log('[     DEVELOPMENT BUILD COMPLETE     ]', 'bgGreen,white,bold');	
		cb();	
	});
	
});



// Gulp Default Build Process
if (mode == 'production') {
	gulp.task('default', ['production']);
} else {
	gulp.task('default', ['development']);
}


/**
 * Simplify the log function
 * Styles comma separated styles ie: bgCyan,white,bold
 */
function log(str, styles) {

	// apply styles
	if (styles != null) {
		var parts = styles.split(',');
		for(var i=0; i<=parts.length-1; i++)
			str = colors[parts[i]].apply(this, [str]);
	}

	gutil.log(str);
}
