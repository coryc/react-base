var package = require('./package.json');

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var del = require('del');
var fs = require('fs');
var path = require('path');
var file = require('gulp-file');
var rename = require('gulp-rename');
var insert = require('gulp-insert');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var runSequence = require('run-sequence').use(gulp);

var gutil  = require('gulp-util'); 
var colors = gutil.colors;
var argv = require('yargs').argv;

// Set default build mode
var mode = (argv.mode=='production' ? 'production' : 'development');

//Start build
log(colors.magenta(colors.bold('Name:  ' + package.name)))
log(colors.magenta(colors.bold('Build: ' + mode)) + '\n\n');



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

// Build Index
gulp.task('build::index', function(cb) {

	var html  = fs.readFileSync(path.join(process.cwd(), 'src', 'index.html'), {
		encoding: 'utf8'
	});

	var scripts = '';
	var scriptTag = function (src) {
		return '	<script type="text/javascript" src="' + src + '"></script>';
	}

	var styles = '';
	var styleTag = function (file, media) {
		media = media || 'screen';
		return '	<link type="text/css" rel="stylesheet" href="' + file + '" media="'+media+'" />\n';
	}

	if (mode == 'production') {
		scripts += scriptTag('/js/app.min.js');
		styles += styleTag('/css/app.min.css');
	} else {
		scripts += scriptTag('/js/app.js');
		styles += styleTag('/css/app.css');
	}

	html = html.replace(new RegExp('{{app:title}}', 'g'), package.name);
	html = html.replace(new RegExp('{{app:scripts}}', 'g'), scripts);
	html = html.replace(new RegExp('{{app:stylesheets}}', 'g'), styles);

	return file('index.html', html, {src: true})
				.pipe(gulp.dest('public'));

});

/**
 * CSS/SASS
 */

// Compile sass
gulp.task('build::css', function(cb) {

	return gulp.src('./src/sass/*.scss')
	           .pipe(sass())
	           .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 9'))
	           .pipe(insert.prepend('@charset "UTF-8";\n'))
	           .pipe(rename('app.css'))
	           .pipe(gulp.dest('public/css/'));

});

// minify css
gulp.task('build::css::min', ['build::css'], function(cb) {

	return gulp.src('./public/css/app.css')
	           .pipe(cssnano())
	           .pipe(rename('app.min.css'))
	           .pipe(gulp.dest('public/css/'));

});



/**
 * Build Tasks
 */

// Clean out the public directory
gulp.task('clean', function (cb) {
	log('>>> cleaning public directory', 'red,bold');
	del(['public/*']).then(function(){
		cb();
	});

}); 

// Production Build
gulp.task('production', function(cb) {

	mode = 'production';

	log('[     PRODUCTION BUILD STARTED...     ]', 'bgCyan,white,bold');
	
	runSequence('build::uglify', 'build::css::min', 'build::index', function() {

		log('[     PRODUCTION BUILD COMPLETE     ]', 'bgGreen,white,bold');
		cb();
	});
	
});

// Development Build
gulp.task('development', function(cb) {

	mode = 'development';

	log('[     DEVELOPMENT BUILD STARTED...     ]', 'bgCyan,white,bold');

	runSequence('build::app', 'build::css', 'build::index', function() {


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
