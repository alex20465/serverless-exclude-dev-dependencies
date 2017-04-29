import gulp = require('gulp');
import ts = require('gulp-typescript');
import mocha = require('gulp-mocha');
import yargs = require('yargs');

const argv = yargs.argv;
const tsProject = ts.createProject('tsconfig.json');

gulp.task('build', ['build-ts', 'move-meta']);

gulp.task('test', ['build'], () => {
  let filename = argv.testCase || '*';
  gulp.src(`./dist/tests/**/${filename}.test.js`)
    .pipe(mocha({
      timeout: 50000
    }));
});

gulp.task('build-ts', () => {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('./dist'));
});

gulp.task('move-meta', () => {
  return gulp.src(['src/**/*', '!src/**/*.ts'])
    .pipe(gulp.dest('./dist'));
});

gulp.task('test-watch', ['test'], () => {
  gulp.watch('./src/**/*.ts', ['test']);
});

gulp.task('build-watch', ['build'], () => {
  gulp.watch('./src/**/*.ts', ['build']);
});
