/* импорт ГЛАВНЫХ модулей */
import * as nodePath from 'path';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import {deleteAsync} from 'del';
import notify from 'gulp-notify';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import zipPlugin from 'gulp-zip';

/* импорт ВСПОМОГАТЕЛЬНЫХ модулей */
  /* HTML */
import fileInclude from 'gulp-file-include';
import htmlMin from 'gulp-htmlmin';
import versionNumber from 'gulp-version-number';
import typograf from 'gulp-typograf';

  /* SCSS */
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import cleanCss from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';

  /* JS */
import terser from 'gulp-terser';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify-es';

  /* IMGs */
import webp from 'gulp-webp';
import imageMin from 'gulp-imagemin';

  /* SERVER */
import browserSync from 'browser-sync';

  /* КОНСТАНТЫ */
const sass = gulpSass(dartSass);
const browser = browserSync.create();
const isProd = process.argv.includes('--production');
const rootFolder = nodePath.basename(nodePath.resolve());

  /* ПУТИ */
const srcFolder = './src';
const buildFolder = './docs';

const srcPaths = {
  srcFavicons: `${srcFolder}/favicons/**/*.*`,
  srcFonts: `${srcFolder}/fonts/**/*.*`,
  srcHtmlBlocks: `${srcFolder}/html-blocks/**/*.html`,
  srcImg: `${srcFolder}/img`,
  srcMainJs: `${srcFolder}/js/*.js`,
  srcBlocksJs: `${srcFolder}/js/blocks-scripts/**/*.js`,
  srcLibrariesJs: `${srcFolder}/js/libraries-scripts/**/*.js`,
  srcMainPages: `${srcFolder}/main-pages/**/*.html`,
  srcSecondaryPages: `${srcFolder}/secondary-pages/**/*.html`,
  srcLibrariesStyles: `${srcFolder}/styles/libraries-styles/**/*.css`,
  srcBlocksStyles:`${srcFolder}/styles/blocks-styles/**/*.scss`,
  srcMainStyles: `${srcFolder}/styles/main-styles/**/*.scss`,
};

const buildPaths = {
  buildFolderFavicons: `${buildFolder}/img/favicons/`,
  buildMainPages: `${buildFolder}/main-pages/`,
  buildSecondaryPages: `${buildFolder}/secondary-pages/`,
  buildFolderFonts: `${buildFolder}/fonts/`,
  buildFolderJs: `${buildFolder}/js/`,
  buildFolderStyles: `${buildFolder}/styles/`,
  buildFolderImg: `${buildFolder}/img/`
};

/* ЗАДАЧИ */

  /* Очистка директории */
function reset() {
  return deleteAsync([buildFolder])
}

  /* HTML */
const htmlMinify = () => {
  return gulp.src(`${srcFolder}/*.html`)
    .pipe(fileInclude())
    .pipe(typograf({
      locale: ['ru', 'en-US'],
    }))
    .pipe(
      versionNumber({
        'value': '%DT%',
        'append': {
          'key': '_v',
          'cover': 0,
          'to' : [
            'css',
            'js',
          ]
        },
        'output': {
          'file': 'gulp-ver/version.json'
        }
      })
    )
    .pipe(gulpIf(isProd, htmlMin({
      collapseWhitespace: true,
    })))
    .pipe(gulp.dest(buildFolder))
    .pipe(browser.stream())
}

const htmlPagesMinify =() => {
  return gulp.src(srcPaths.srcMainPages)
    .pipe(fileInclude())
    .pipe(typograf({
      locale: ['ru', 'en-US']
    }))
    .pipe(gulpIf(isProd, htmlMin({
      collapseWhitespace: true,
    })))
    .pipe(gulp.dest(buildPaths.buildMainPages))
    .pipe(browser.stream())
}

const htmlSecondaryPages =() => {
  return gulp.src(srcPaths.srcSecondaryPages)
    .pipe(fileInclude())
    .pipe(typograf({
      locale: ['ru', 'en-US']
    }))
    .pipe(gulpIf(isProd, htmlMin({
      collapseWhitespace: true,
    })))
    .pipe(gulp.dest(buildPaths.buildSecondaryPages))
    .pipe(browser.stream())
}

  /* SCSS */
const cssMinify = () => {
  return gulp.src(srcPaths.srcMainStyles)
    .pipe(gulpIf(!isProd, sourcemaps.init()))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(autoprefixer({
      cascade: false,
      grid: true,
      overrideBrowserslist: ["last 5 versions"],
      browsers: [
				'Android >= 4',
				'Chrome >= 20',
				'Firefox >= 24',
				'Explorer >= 11',
				'iOS >= 6',
				'Opera >= 12',
				'Safari >= 6',
			]
    }))
    .pipe(gulpIf(isProd, cleanCss()))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulpIf(!isProd, sourcemaps.write()))
    .pipe(gulp.dest(buildPaths.buildFolderStyles))
    .pipe(browser.stream())
}

const cssLibraries = () => {
  return gulp.src(srcPaths.srcLibrariesStyles)
    .pipe(gulpIf(!isProd, sourcemaps.init()))
    .pipe(autoprefixer({
      cascade: false,
      grid: true,
      overrideBrowserslist: ["last 5 versions"],
      browsers: [
				'Android >= 4',
				'Chrome >= 20',
				'Firefox >= 24',
				'Explorer >= 11',
				'iOS >= 6',
				'Opera >= 12',
				'Safari >= 6',
			]
    }))
    .pipe(gulpIf(isProd, cleanCss()))
    .pipe(gulpIf(!isProd, sourcemaps.write()))
    .pipe(gulp.dest(buildPaths.buildFolderStyles))
    .pipe(browser.stream())
}

  /* JS */
const jsMinify = () => {
  return gulp.src(srcPaths.srcMainJs)
    .pipe(gulpIf(!isProd, sourcemaps.init()))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulpIf(isProd, uglify.default().on('error', notify.onError())))
    .pipe(gulpIf(isProd, terser()))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulpIf(!isProd, sourcemaps.write()))
    .pipe(gulp.dest(buildPaths.buildFolderJs))
    .pipe(browser.stream())
}

const jsLibraries = () => {
  return gulp.src(srcPaths.srcLibrariesJs)
    .pipe(gulpIf(!isProd, sourcemaps.init()))
    .pipe(gulpIf(isProd, terser()))
    .pipe(gulpIf(!isProd, sourcemaps.write()))
    .pipe(gulp.dest(buildPaths.buildFolderJs))
    .pipe(browser.stream())
}

const jsBlocks = () => {
  return gulp.src(srcPaths.srcBlocksJs)
  .pipe(gulpIf(!isProd, sourcemaps.init()))
  .pipe(gulpIf(isProd, terser()))
  .pipe(rename({
    extname: '.min.js'
  }))
  .pipe(gulpIf(!isProd, sourcemaps.write()))
  .pipe(gulp.dest(buildPaths.buildFolderJs))
  .pipe(browser.stream())
}

  /* IMGS, SVG */
const imgMinify = () => {
  return gulp.src([
    `${srcPaths.srcImg}/*.jpg`,
    `${srcPaths.srcImg}/*.png`,
    `${srcPaths.srcImg}/*.jpeg`,
    `${srcPaths.srcImg}/*.webp`,
  ])
    .pipe(imageMin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      interlaced: true,
      optimizationLevel: 2 // от 0 до 7
    }))
    .pipe(webp())
    .pipe(gulp.dest(buildPaths.buildFolderImg))
    .pipe(browser.stream())
}

const imgNoWebp = () => {
  return gulp.src([
    `${srcPaths.srcImg}/no-minify/**/*.jpg`,
    `${srcPaths.srcImg}/no-minify/**/*.png`,
    `${srcPaths.srcImg}/no-minify/**/*.jpeg`,
    `${srcPaths.srcImg}/no-minify/**/*.webp`,
  ])
    .pipe(imageMin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      interlaced: true,
      optimizationLevel: 2 // от 0 до 7
    }))
    .pipe(gulp.dest(buildPaths.buildFolderImg))
    .pipe(browser.stream())
}

const svgTransfer = () => {
  return gulp.src(`${srcPaths.srcImg}/svg/**/*.svg`)
    .pipe(gulp.dest(buildPaths.buildFolderImg));
}

const faviconsTransfer = () => {
  return gulp.src(srcPaths.srcFavicons)
    .pipe(gulp.dest(buildPaths.buildFolderFavicons));
}

  /* FONTS */
const fontsTransfer = () => {
  return gulp.src(srcPaths.srcFonts)
    .pipe(gulp.dest(buildPaths.buildFolderFonts));
}

  /* OTHER FILES */
const otherFiles = () => {
  return gulp.src(`${srcFolder}/other/**/*.*`)
    .pipe(gulp.dest(buildFolder));
}

  /* ZIP */
const zip = () => {
  deleteAsync(`./${rootFolder}.zip`)
  return gulp.src(`${buildFolder}/**/*.*`)
    .pipe(gulpIf(isProd, zipPlugin(`${rootFolder}.zip`)))
    .pipe(gulpIf(isProd, gulp.dest('./')))
}

  /* SERVER */
const serverInit = () => {
  browserSync.init({
    server: {
      baseDir: buildFolder
    },
    files: `${srcFolder}/**/*.*`,
    watchEvents: ['add','change','unlink','unlinkDir'],
    notify: false
  })
}

  /* WATCH FILES */
function watchFiles() {
  gulp.watch([
    `${srcFolder}/*.html`,
    `${srcFolder}/html-blocks/**/*.html`,
  ], htmlMinify);
  gulp.watch([
      srcPaths.srcMainPages,
      `${srcFolder}/html-blocks/**/*.html`,
    ], htmlPagesMinify);
  gulp.watch([
    srcPaths.srcSecondaryPages,
    `${srcFolder}/html-blocks/**/*.html`,
  ], htmlSecondaryPages);
  gulp.watch([
    srcPaths.srcMainStyles,
    srcPaths.srcBlocksStyles,
  ], cssMinify);
  gulp.watch(srcPaths.srcLibrariesStyles, cssLibraries);
  gulp.watch(srcPaths.srcMainJs, jsMinify);
  gulp.watch(srcPaths.srcLibrariesJs, jsLibraries);
  gulp.watch(srcPaths.srcBlocksJs, jsBlocks);
  gulp.watch([
    `${srcPaths.srcImg}/*.jpg`,
    `${srcPaths.srcImg}/*.png`,
    `${srcPaths.srcImg}/*.jpeg`,
    `${srcPaths.srcImg}/*.webp`,
  ], imgMinify);
  gulp.watch(`${srcPaths.srcImg}/no-minify/**/*.*`, imgNoWebp);
  gulp.watch(`${srcPaths.srcImg}/svg/**/*.svg`, svgTransfer);
  gulp.watch(srcPaths.srcFavicons, faviconsTransfer);
  gulp.watch(srcPaths.srcFonts, fontsTransfer);
  gulp.watch(`${srcFolder}/other/**/*.*`, otherFiles);
}

const mainTasks = gulp.series(
  htmlMinify,
  htmlPagesMinify,
  htmlSecondaryPages,
  jsMinify,
  jsLibraries,
  jsBlocks,
  cssMinify,
  cssLibraries,
  imgMinify,
  imgNoWebp,
  svgTransfer,
  faviconsTransfer,
  fontsTransfer,
  otherFiles,
  zip
)

const dev = gulp.series(reset, mainTasks, gulp.parallel(watchFiles, serverInit));

gulp.task('default', dev);