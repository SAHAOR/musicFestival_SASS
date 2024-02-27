//GULP: Automatizador de tareas (aqui se conecta con SASS para automatizar la compilacion de SASS a CSS)
//funciona con NPX por tanto, comando para correr una funcion = npx gulp nombreFuncion

//series en gulp: diferentes tareas se ejecutan de forma secuencial
//paralel en gulp: todas las funciones se ejecutan al mismo tiempo



//PROCESO DE GULP PARA SCSS
const{src, dest, watch, parallel} = require("gulp"); //trae funcionalidad de gulp a este archivo
const sass = require("gulp-sass")(require('sass')); //usa gulp-sass para conexion y luego sass como base de conocimiento para compilar css  
const plumber = require('gulp-plumber');  //se instala dependencia gulp-plumber para evitar que workflow no se interrumpa ante un error       
const autoprefixer = require('autoprefixer'); //paquete que junto con css nano y gulp-postcss permiten comprimir y eficientar codigo css
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps'); //hace un mapeo de css antes de comprimirse para ubicar en que parte esta cada cosa incluso con scss

function css(done){ //compilador de SASS mediante gulp
    
    //identificar el archivo SASS / compilarlo / almacenarlo en css (disco duro)
    //src('src/scss/app.scss').pipe(sass()).pipe(dest('build/css'))

    //hacer lo mismo que antes pero para todos los archivos scss disponibles
    src('src/scss/**/*.scss').pipe(sourcemaps.init()).pipe(plumber()).pipe(sass()).pipe(postcss([autoprefixer(), cssnano()])).pipe(sourcemaps.write('.')).pipe(dest('build/css'))
    
    done(); //callback que avisa a gulp cuando llegamos al final (life hack)
}

//EFICIENTAR CODIGO JS CON TERSER Y HACER UN MAPEO IGUAL QUE CON CSS
const terser = require('gulp-terser-js');

//LLEVAR ARCHIVOS JS DE DEV(SRC) A BUILD / EFICIENTAR CODIGO CON TERSER Y MAPEO
function javascript(done){
    src('src/js/**/*.js').pipe(sourcemaps.init()).pipe(terser()).pipe(sourcemaps.write('.')).pipe(dest('build/js'));

    done();
}


//PROCESO PARA HACER WATCH TODO EL TIEMPO EN TERMINAL
function dev(done){
    watch('src/scss/**/*.scss', css); //actualizar en tiempo real cambios de doc app a doc style.css
    watch('src/**/*.js', javascript); //escuchando por cambios en funcion js
    done();
}



//PROCESO AUTOMATIZAR IMGS A WEBP
async function versionWebp(done) {
 
    const webp = await import("gulp-webp"); // Manda a traer la dependencia instalada con "npm install --save-dev gulp-webp" desde la terminal"
 
 
    const opciones = {
        quality: 50 // Esto define que tanta calidad se le bajarán a las imágenes
    }
 
    src('src/img/**/*.{png,PNG,jpg,JPG}') // Busca recursivamente en todos los archivos y carpetas de la carpeta img con los formatos especificados
        .pipe(webp.default(opciones)) // Los convierte en formato WEBP y les baja la calidad especificada
        .pipe(dest('build/img')) // Los guarda en una nueva carpeta
    
    done(); // Callback que avisa a gulp cuando llegamos al final de la ejecución del script
}



//PROCESO ALIGERAR IMGS JPG (SIN CAMBIAR FORMATO)
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');

function imagenes(done){

    const opciones = {
        optimizationLevel: 3
    }
    
    src('src/img/**/*.{jpg,png}').pipe(cache(imagemin(opciones))).pipe(dest('build/img'));

    done();
}


//PROCESO PARA AUTOMATIZAR IMGS JPG A AVIF

const avif = require('gulp-avif');

function versionAvif(done){
    const opciones ={
        quality:50
    };

    src('src/img/**/*.{jpg,png}').pipe(avif(opciones)).pipe(dest('build/img'));

    done();
}


//LLAMANDO TODAS LAS FUNCIONES (CON PARALLEL)
exports.css = css;
exports.js = javascript;
exports.versionWebp = versionWebp;
exports.imagenes = imagenes;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, javascript, versionAvif, dev);

