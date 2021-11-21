const { src, dest, watch, parallel } = require('gulp');

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

// Imagenes
const webp = require('gulp-webp');

function css( done ){

src('src/scss/**/*.scss') //Identificas archivo scss a compilar
  .pipe(plumber())
  .pipe( sass() ) // Compilarlo
  .pipe( dest('build/css') ) // Almacenarlo en el disco duro

  done();
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

function dev(done) {

  watch('src/scss/**/*.scss', css) // Toma dos parametros 1-A que archivo le voy a hacer watch 2-Que funcion va a estar asociada

  done();
}

exports.css = css;
exports.versionWebp = versionWebp; // Ponemos disponoble nuestra funcion en el gulp
exports.dev = parallel( versionWebp, dev ); // Por el parallel va a ejecutar las dos funciones

