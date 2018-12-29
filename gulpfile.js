var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var webserver = require('gulp-webserver');
var clean = require('gulp-clean-css'); //压缩css
var uglify = require('gulp-uglify'); //压缩js
var babel = require('gulp-babel'); //es5-->es6
var url = require('url');
var path = require('path');
var fs = require('fs');
var listdata = require('./data/list.json');


//编译scss
gulp.task('sass', function() {
    return gulp.src('./src/scss/index.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        // .pipe(clean())
        .pipe(gulp.dest('./src/css'))
});


//监听scss
gulp.task('watch', function() {
    return gulp.watch('./src/scss/index.scss', gulp.series('sass'))
});

//es5-->es6
gulp.task('minbabel', function() {
    return gulp.src('./src/js/index.js')
        .pipe(babel({
            presets: 'es2015'
        }))
        .pipe(gulp.dest('./src/js'))
});



//压缩js
// gulp.task('minuglify', function() {
//     return gulp.src('./src/js/index.js')
//          .pipe(uglify())
//         .pipe(gulp.dest('./src/js'))
// });


//起服务
gulp.task('server', function() {
    return gulp.src('./src')
        .pipe(webserver({
            port: 3000,
            open: true,
            livereload: true,
            host: '192.168.0.15',
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    res.end('');
                    return;
                }

                if (pathname === '/api/list') {
                    res.end(JSON.stringify({ code: 1, data: listdata }))
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }

        }))
});


gulp.task('dev', gulp.series('sass', 'minbabel', 'server', 'watch'));