document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

//funcion agrupadora
function iniciarApp(){
    navegacionFija();
    crearGaleria();
    scrollNav();
}

//dejar el header fijo luego de un punto
function navegacionFija(){
    const body = document.querySelector('body');
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    window.addEventListener('scroll', function() {

        if(sobreFestival.getBoundingClientRect().top < 0){
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }
        else{
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}

//efecto smooth en scroll (ajuste adicional en html globales)
function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach(enlace =>{
        enlace.addEventListener('click', function(e){
            const seccionScroll =e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({ behaviour: "smooth"});
        });
    });
}

//crear galeria
function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <=12; i++){
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
        <source class="image_galeria" srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source class="image_galeria" srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img class="image_galeria" loading="lazy" width="200" height="300" src="buil/img/thumb/${i}.jpg" alt="imagen galeria"></img>
        `;

        imagen.onclick = function(){
            mostrarImagen(i);
        }
        galeria.appendChild(imagen);
    }
}
//mostrar imagen grande galeria
function mostrarImagen(id){
    const imagen = document.createElement('picture');
        imagen.innerHTML = `
        <source class="image_galeria" srcset="build/img/grande/${id}.avif" type="image/avif">
        <source class="image_galeria" srcset="build/img/grande/${id}.webp" type="image/webp">
        <img class="image_galeria" loading="lazy" width="200" height="300" src="buil/img/grande/${id}.jpg" alt="imagen galeria"></img>
        `;

    //crear el overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

    //boton para cerrar el modal 
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    overlay.appendChild(cerrarModal);

    //agregarlo al html
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}

