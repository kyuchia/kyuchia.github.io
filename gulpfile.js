const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const plumber = require('gulp-plumber');

// 處理所有 HTML（保留資料夾結構）
gulp.task('html', function () {
  return gulp.src(['src/**/*.html'], { base: 'src' })
    .pipe(plumber())
    .pipe(fileInclude({
      prefix: '<!-- #',
      suffix: ' -->',
      basepath: 'src/partials'
    }))
    .pipe(gulp.dest('dist'));
});

// ✅ 複製資源檔案（CSS / JS / assets / JSON）
gulp.task('copy', function () {
  return gulp.src([
    'src/css/**/*',
    'src/js/**/*',
    'src/assets/**/*',
    'src/research/**/*.json'  // <--- 加這行，包含 content.json
  ], { base: 'src' })
    .pipe(gulp.dest('dist'));
});

// 預設任務：先處理 HTML，再複製資源
gulp.task('default', gulp.series('html', 'copy'));
