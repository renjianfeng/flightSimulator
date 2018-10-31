/**
 * Created by anlun on 16/7/16.
 */
var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('packToOne', function(){
    //复制资源文件
    gulp.src('./src/Resource/**')
        .pipe(gulp.dest('./released/src/Resource'))


    //复制资源文件
    gulp.src('./template/**')
        .pipe(gulp.dest('./released'))

    //合并js文件
    gulp.src(
        [
            './libs/pep.min.js',
            './libs/zepto.min.js',
            './libs/v33/babylon.js',
            './libs/new2/babylon.gui.min.js',
            './libs/pep.min.js',
            './libs/tween.min.js',
            './libs/new2/babylon.glTF2FileLoader.min.js',
            './libs/babylonjs.materials.min.js',
            './dist/hi.js'
            ])
        .pipe(concat('all.js'))
       // .pipe(uglify())
        .pipe(gulp.dest('released'))
});