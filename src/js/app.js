document.addEventListener('DOMContentLoaded', function() { // Vamos a escuchar nuestra aplicacion
  iniciarApp();
});

function iniciarApp() {
  crearGaleria();
  scrollNav();
};

function scrollNav() {
  const enlaces = document.querySelectorAll( '.navegacion-principal a' ) // Selecciono los enlaces
  
  enlaces.forEach( enlace => { 
    enlace.addEventListener( 'click', function(e) {
      e.preventDefault();

      const seccionScroll = e.target.attributes.href.value; // Le asigno el value del href
      const seccion = document.querySelector( seccionScroll );
      seccion.scrollIntoView( { behavior: 'smooth' } ); // Le paso el objeto de configuracion y adentro el behavior o comportamiento y decirle que utilice smooth como comportamiento   
    });
  });
};

function crearGaleria() {
  const galeria = document.querySelector('.galeria-imagenes');

  for( let i = 1; i <= 12; i++ ) {
    const imagen = document.createElement('PICTURE');
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

  const imagen = document.createElement('PICTURE');
    imagen.innerHTML = ` 
      <source srcset="build/img/grande/${id}.avif" type="image/avif">
      <source srcset="build/img/grande/${id}.webp" type="image/webp">
      <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="Imagen galeria">
     `;

  // Crea el overlay con la imagen 
  const overlay = document.createElement('DIV'); // Creo el div y se lo asigno al overlay
  overlay.appendChild(imagen); // A ese DIV le agrego como hijo a imagen
  overlay.classList.add('overlay') // Agrego uma clase llamada overlay para poder darle estilos con css

  overlay.onclick = function() {
      // Para poder cerrar la imagen grande dando click en cualquier parte 
    const body = document.querySelector('body'); // Selecciono todo el body 
    body.classList.remove('fijar-body'); // Elimino la clase del body
    overlay.remove(); // Elimino el overlay
  };
  
  // Boton para cerrar el Modal
  const cerrarModal = document.createElement('P'); //Creamos el elemento parrafo
  cerrarModal.textContent = 'X'; // Agregamos el contenido txt una X
  cerrarModal.classList.add('btn-cerrar'); // Creamos la clase btn-cerrar
  
  cerrarModal.onclick = function() { // Cuando de click indico que elimine el overlay
      // Para cerrar la imagen dando click en la X
    const body = document.querySelector('body'); // Selecciono todo el body 
    body.classList.remove('fijar-body'); // Elimino la class del body
    
    overlay.remove(); // Elimino el overlay
  };

  overlay.appendChild(cerrarModal); // Lo agrego al overlay 

  // Lo añade al html 
  const body = document.querySelector('body'); // Selecciono todo el body 
  body.appendChild(overlay) // Le agrego el overlay al body para que agrege la imagen y la muestre
  body.classList.add('fijar-body'); // Le creo un class al body
}