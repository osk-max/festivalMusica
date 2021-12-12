const { src, dest, watch, parallel } = require('gulp');

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

// Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// Javascript
const terser = require('gulp-terser-js');

function css( done ){

src('src/scss/**/*.scss') //Identificas archivo scss a compilar
  .pipe(sourcemaps.init()) // Con esto se inicializa el sourcemaps
  .pipe(plumber())
  .pipe( sass() ) // Compilarlo
  .pipe( postcss([ autoprefixer(), cssnano() ]) ) // Funcionamiento cualquier navegador y comprension
  .pipe( sourcemaps.write('.')) // Esta es la ubicacion donde se va a guardar con el punto le indico que es la misma que tengo abajo
  .pipe( dest('build/css') ) // Almacenarlo en el disco duro

  done();
}

function imagenes( done ) {

  const opciones = {
    optimizationLevel: 3
  };
  src('src/img/**/*.{png,jpg}') // Para identificar los archivos
    .pipe( cache( imagemin( opciones ) ) ) // imagemin optimiza la imagen y va a quedar en cache
    .pipe( dest( 'build/img' ) ) // Donde quedaran almacenadas
  done(); // Avisa que ya termino todo el procesamiento
}

function versionWebp( done ) {

  const opciones = {
    quality: 50
  };

  src('src/img/**/*.{png,jpg}') // Le indico ubicacion de las imagenes y que extencion de imagenes puede convertir
  .pipe( webp( opciones ) ) // Realiza la conversion
  .pipe( dest( 'build/img') ) // Destino donde las almacenara
  done();
}

function versionAvif( done ) {

  const opciones = {
    quality: 50
  };

  src('src/img/**/*.{png,jpg}') // Le indico ubicacion de las imagenes y que extencion de imagenes puede convertir
  .pipe( avif( opciones ) ) // Realiza la conversion
  .pipe( dest( 'build/img') ) // Destino donde las almacenara
  done();
}

function javascript( done ) {
  src( 'src/js/**/*.js' ) // Ubicacion donde estaran todos los archivos JS
    .pipe(sourcemaps.init()) // Inicializar sourcemaps
    .pipe(terser()) // Mimificar el codigo JS
    .pipe(sourcemaps.write('.')) // Esta es la ubicacion donde se va a guardar con el punto le indico que es la misma que tengo abajo
    .pipe( dest( 'build/' ) ) // Destino donde estara en el build 
    done();
}

function dev(done) {

  watch('src/scss/**/*.scss', css) // Toma dos parametros 1-A que archivo le voy a hacer watch 2-Que funcion va a estar asociada
  watch('src/js/**/*.js', javascript) // // Tambien toma los parametros para que este ecuchando los cambio de JS y los realice de inmediato
  done();
}

exports.css = css;
exports.javascript = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp; // Ponemos disponible nuestra funcion en el gulp
exports.versionAvif = versionAvif; // Ponemos disponible nuestra funcion en el gulp
exports.dev = parallel( imagenes, versionWebp, versionAvif, javascript, dev ); // Por el parallel va a ejecutar las dos funciones

