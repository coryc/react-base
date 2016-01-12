var package = require('./package.json');

var gulp = require('gulp');
var argv = require('yargs').argv;
var del = require('del');
var fs = require('fs');


var gutil  = require('gulp-util'); 
var colors = gutil.colors;

var runSequence = require('run-sequence');



// Set default build mode
var mode = (argv.mode=='production' ? 'production' : 'development');


//Start build
log(colors.magenta(colors.bold('Name:  ' + package.name)))
log(colors.magenta(colors.bold('Build: ' + mode)) + '\n\n');




// Gulp Default Build Process
gulp.task('default', function(cb) {

	if (mode == 'production') {
		runSequence('build::production', function() {
			log('[     PRODUCTION BUILD COMPLETE     ]', 'bgGreen,white,bold');
			cb();
		});
	} else {
		runSequence('build::development', function() {
			log('[     DEVELOPMENT BUILD COMPLETE     ]', 'bgGreen,white,bold');	
			cb();
		});
	}
});

// Production Build
gulp.task('build::production', function(cb) {

	log('[     PRODUCTION BUILD STARTED...     ]', 'bgCyan,white,bold');
	cb();
});

// Development Build
gulp.task('build::development', function(cb) {

	log('[     DEVELOPMENT BUILD STARTED...     ]', 'bgCyan,white,bold');
	cb();
});


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
