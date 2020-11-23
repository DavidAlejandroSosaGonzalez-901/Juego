var ctx;
var canvas;
var palabra;
var letras = "QWERTYUIOPASDFGHJKLÑZXCVBNM";
var colorTecla = "#585858";
var colorMargen = "red";
var inicioX = 200;
var inicioY = 300;
var lon = 35;
var margen = 20;
var pistaText = "";
var teclas_array = new Array();
var letras_array = new Array();
var palabras_array = new Array();
var aciertos = 0;
var errores = 0;
palabras_array.push("LEON");
palabras_array.push("CABALLO");
palabras_array.push("PERRO");
palabras_array.push("GATO");
palabras_array.push("LAGARTIJA");
palabras_array.push("RINOCERONTE");
palabras_array.push("TIBURON");
palabras_array.push("CARACOL");
palabras_array.push("ALACRAN");
palabras_array.push("ARAÑA");
palabras_array.push("CHAPULIN");
palabras_array.push("AVESTRUZ");
palabras_array.push("OCELOTE");
palabras_array.push("RATON");
palabras_array.push("AGUILA");
    
function Tecla(x, y, ancho, alto, letra){
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.letra = letra;
    this.dibuja = dibujaTecla;
}
function Letra(x, y, ancho, alto, letra){
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.letra = letra;
    this.dibuja = dibujaCajaLetra;
    this.dibujaLetra = dibujaLetraLetra;
}
function dibujaTecla(){
    ctx.fillStyle = colorTecla;
    ctx.strokeStyle = colorMargen;
    ctx.fillRect(this.x, this.y, this.ancho, this.alto);
    ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
    
    ctx.fillStyle = "white";
    ctx.font = "bold 20px courier";
    ctx.fillText(this.letra, this.x+this.ancho/2-5, this.y+this.alto/2+5);
}
function dibujaLetraLetra(){
    var w = this.ancho;
    var h = this.alto;
    ctx.fillStyle = "black";
    ctx.font = "bold 40px Courier";
    ctx.fillText(this.letra, this.x+w/2-12, this.y+h/2+14);
}
function dibujaCajaLetra(){
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillRect(this.x, this.y, this.ancho, this.alto);
    ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
}
function pistaFunction(palabra){
    let pista = ""; 
    switch(palabra){   
        case 'LEON':    
            pista = "Pista: Rey de la selva";
            break;      
        case 'CABALLO':
            pista = "Pista: Relincha";
            break;
        case 'PERRO':
            pista = "Pista: Dice guau";
            break;
        case 'GATO':
            pista = "Pista: No pues miau";
            break;
        case 'LAGARTIJA':    
            pista = "Pista: Son un ejercicio";
            break;      
        case 'RINOCERONTE':
            pista = "Pista: Vive en africa tiene un cuerno en la cabeza";
            break;
        case 'TIBURON':
            pista = "Pista: El rey del mar";
            break;
        case 'CARACOL':
            pista = "Pista: Es lento y con caparazon";
            break;
        case 'ALACRAN':
            pista = "Pista: Te pica, te pica y vivie en el desierto";
            break;
        case 'CHAPULIN':
            pista = "Pista: Es colorado y no contaban con su astucia";
            break;
        case 'ARAÑA':
            pista = "Pista: El pico a Spiderman";
            break;
        case 'AVESTRUZ':    
                pista = "Pista: Aves de cuello grande";
                break;      
            case 'OCELOTE':
                pista = "Pista: Empieza con O y termina con CELOTE";
                break;
            case 'RATON':
                pista = "Pista: Es pequeño, asusta a los elefantes";
                break;
            case 'AGUILA':
                pista = "Pista: Las poderosisimas";
                break;
        default:   
            pista="No hay pista aun xP";
    }
    ctx.fillStyle = "black";  
    ctx.font = "bold 20px Courier";  
    ctx.fillText(pista, 10, 15); 
}
function teclado(){
    var ren = 0;
    var col = 0;
    var letra = "";
    var miLetra;
    var x = inicioX;
    var y = inicioY;
    for(var i = 0; i < letras.length; i++){
        letra = letras.substr(i,1);
        miLetra = new Tecla(x, y, lon, lon, letra);
        miLetra.dibuja();
        teclas_array.push(miLetra);
        x += lon + margen;
        col++;
        if(col==10){
            col = 0;
            ren++;
            if(ren==2){
                x = 280;
            } else {
                x = inicioX;
            }
        }
        y = inicioY + ren * 50;
    }
}
function pintaPalabra(){
    var p = Math.floor(Math.random()*palabras_array.length);
    palabra = palabras_array[p];
    pistaFunction(palabra);
    var w = canvas.width;
    var len = palabra.length;
    var ren = 0;
    var col = 0;
    var y = 230;
    var lon = 50;
    var x = (w - (lon+margen) *len)/2;
    for(var i=0; i<palabra.length; i++){
        letra = palabra.substr(i,1);
        miLetra = new Letra(x, y, lon, lon, letra);
        miLetra.dibuja();
        letras_array.push(miLetra);
        x += lon + margen;
    }
}
function horca(errores){
    var imagen = new Image();
    imagen.src = "imagenes/ahorcado"+errores+".png";
    imagen.onload = function(){
        ctx.drawImage(imagen, 390, 0, 230, 230);
    }
}
function ajusta(xx, yy){
    var posCanvas = canvas.getBoundingClientRect();
    var x = xx-posCanvas.left;
    var y = yy-posCanvas.top;
    return{x:x, y:y}
}
function selecciona(e){
    var pos = ajusta(e.clientX, e.clientY);
    var x = pos.x;
    var y = pos.y;
    var tecla;
    var bandera = false;
    for (var i = 0; i < teclas_array.length; i++){
        tecla = teclas_array[i];
        if (tecla.x > 0){
            if ((x > tecla.x) && (x < tecla.x + tecla.ancho) && (y > tecla.y) && (y < tecla.y + tecla.alto)){
                break;
            }
        }
    }
    if (i < teclas_array.length){
        for (var i = 0 ; i < palabra.length ; i++){ 
            letra = palabra.substr(i, 1);
            if (letra == tecla.letra){ 
                caja = letras_array[i];
                caja.dibujaLetra();
                aciertos++;
                bandera = true;
            }
        }
        if (bandera == false){ 
            errores++;
            horca(errores);
            if (errores == 5) gameOver(errores);
        }
        ctx.clearRect(tecla.x - 1, tecla.y - 1, tecla.ancho + 2, tecla.alto + 2);
        tecla.x - 1;
        if (aciertos == palabra.length) gameOver(errores);
    }
}
function gameOver(errores){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "bold 50px Courier";
    if (errores < 5){
        ctx.fillText("Muy bien, la palabra es: ", 110, 280);
    } else {
        ctx.fillText("Lo sentimos, la palabra era: ", 110, 280);
    }
    ctx.font = "bold 80px Courier";
    lon = (canvas.width - (palabra.length*48))/2;
    ctx.fillText(palabra, lon, 380);
    horca(errores);
}
window.onload = function(){
    canvas = document.getElementById("pantalla");
    if (canvas && canvas.getContext){
        ctx = canvas.getContext("2d");
        if(ctx){
            teclado();
            pintaPalabra();
            horca(errores);
            canvas.addEventListener("click", selecciona, false);
        } else {
            alert ("Error al cargar el contexto!");
        }
    }
}