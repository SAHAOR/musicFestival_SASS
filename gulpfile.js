//GULP: Automatizador de tareas (aqui se conecta con SASS para automatizar la compilacion de SASS a CSS)
//funciona con NPX por tanto, comando para correr una funcion = npx gulp nombreFuncion

const{src, dest, watch} = require("gulp"); //trae funcionalidad de gulp a este archivo
const sass = require("gulp-sass")(require('sass')); //usa gulp-sass para conexion y luego sass como base de conocimiento para compilar css  
const plumber = require('gulp-plumber');  //se instala dependencia gulp-plumber para evitar que workflow no se interrumpa ante un error       

function css(done){ //compilador de SASS mediante gulp
    
    //identificar el archivo SASS / compilarlo / almacenarlo en css (disco duro)
    //src('src/scss/app.scss').pipe(sass()).pipe(dest('build/css'))

    //hacer lo mismo que antes pero para todos los archivos scss disponibles
    src('src/scss/**/*.scss').pipe(plumber()).pipe(sass()).pipe(dest('build/css'))
    
    done(); //callback que avisa a gulp cuando llegamos al final (life hack)
}

function dev(done){
    watch('src/scss/**/*.scss', css) //actualizar en tiempo real cambios de doc app a doc style.css
    
    done();
}

exports.css = css;
exports.dev = dev;