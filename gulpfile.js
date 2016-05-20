var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('scripts', function() {
    gulp.src([
        'src/SmartProperty.js',
        'src/App.js'
    ])
        .pipe(concat('html5-video-player.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./build'));
});

gulp.task('default', ['scripts']);