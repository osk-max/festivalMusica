const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

function css( done ){

src('src/scss/**/*.scss') //Identificas archivo scss a compilar
  .pipe(plumber())
  .pipe( sass() ) // Compilarlo
  .pipe( dest('build/css') ) // Almacenarlo en el disco duro

  done();
}

function dev(done) {

  watch('src/scss/**/*.scss', css) // Toma dos parametros 1-A que archivo le voy a hacer watch 2-Que funcion va a estar asociada

  done();
}

exports.css = css;
exports.dev = dev;

