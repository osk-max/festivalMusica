const { src, dest, watch, parallel } = require('gulp');

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

// Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css( done ){

src('src/scss/**/*.scss') //Identificas archivo scss a compilar
  .pipe(plumber())
  .pipe( sass() ) // Compilarlo
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

function dev(done) {

  watch('src/scss/**/*.scss', css) // Toma dos parametros 1-A que archivo le voy a hacer watch 2-Que funcion va a estar asociada

  done();
}

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp; // Ponemos disponible nuestra funcion en el gulp
exports.versionAvif = versionAvif; // Ponemos disponible nuestra funcion en el gulp
exports.dev = parallel( imagenes, versionWebp, versionAvif, dev ); // Por el parallel va a ejecutar las dos funciones

