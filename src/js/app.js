document.addEventListener('DOMContentLoaded', function() { // Vamos a escuchar nuestra aplicacion
  iniciarApp();
});

function iniciarApp() {
  crearGaleria();
}

function crearGaleria() {
  const galeria = document.querySelector('.galeria-imagenes');

  for( let i = 1; i <= 12; i++ ) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = ` 
      <source srcset="build/img/thumb/${i}.avif" type="image/avif">
      <source srcset="build/img/thumb/${i}.webp" type="image/webp">
      <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Imagen galeria">
     `; 
     imagen.onclick = function() { // Lo utilizaremos para que nos indique a que foto le estamos dando click
       mostrarImagen( i );
     }
    galeria.appendChild(imagen);
  }
}

function mostrarImagen( id ) { // Lo utilizaremos para que nos indique a que foto le estamos dando click

  console.log('mostrando...', id);
}

