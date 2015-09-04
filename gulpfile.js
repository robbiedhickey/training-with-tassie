var gulp = require('gulp');
var connect = require('gulp-connect'); // runs a local dev server
var open = require('gulp-open'); // opens in browser
var browserify = require('browserify'); // bundles js
var reactify = require('reactify'); // transforms react jsx to js
var source = require('vinyl-source-stream'); // use contentional text streams with gulp
var concat = require('gulp-concat'); // concats files..
var lint = require('gulp-eslint'); // lint js and jsx files

process.env.NODE_ENV = 'development';

var config = {
  port: 8001,
  developmentUrl: 'http://localhost',
  paths: {
    html: './src/*.html',
    images: './src/images/*',
    css: [
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/toastr/toastr.css',
      'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
    ],
    js: './src/**/*.js',
    mainJs: './src/main.js',
    dist: './dist'
  }
};

gulp.task('dev-server', function(){
  console.log('start development server');
  connect.server({
    root: 'dist',
    base: config.developmentUrl,
    port: config.port,
    liveReload: true
  });
});

gulp.task('open-browser', ['dev-server'], function(){
  console.log('open web browser');
  gulp.src('dist/index.html')
      .pipe(open({ uri: config.developmentUrl + ':' + config.port + '/' } ));
});

gulp.task('html', function(){
  console.log('compile html');
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload());
});

gulp.task('css', function(){
  console.log('compile css');
  gulp.src(config.paths.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist + '/css'))
    .pipe(connect.reload());
});

gulp.task('js', function(){
  console.log('compile js');
  browserify(config.paths.mainJs)
    .transform(reactify)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(config.paths.dist + '/scripts'))
    .pipe(connect.reload());
});

gulp.task('images', function(){
  console.log('compile images');
  gulp.src(config.paths.images)
    .pipe(gulp.dest(config.paths.dist + '/images'))
    .pipe(connect.reload());
});

gulp.task('lint', function(){
  console.log('lint code');
  return gulp.src(config.paths.js)
            .pipe(lint({config: 'eslint.config.json'}))
            .pipe(lint.format());
});

gulp.task('watch', function(){
  console.log('set up watch for live reload');
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js', 'lint']);
  gulp.watch(config.paths.css, ['css']);
});

gulp.task('default', ['html', 'css', 'js', 'images', 'lint', 'open-browser', 'watch']);
