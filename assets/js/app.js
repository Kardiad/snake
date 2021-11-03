const tablero = document.querySelector('.mapa');
const celdas =tablero.querySelectorAll('div');
let frutaPosicion = Math.trunc(Math.random()*celdas.length);
let score = 0;
let actualPosicion = 0;
let intervaloIzq = 0;
let intervaloDcha = 0;
let intervaloArriba = 0;
let intervaloAbajo = 0;
let moveReIzq = false;
let moveReDcha = false;
let moveReUp = false;
let moveReDown = false;
let lastPar = false;
let lastNone = false;
let ubicacion = [];
let speed = 1000;
//Fruit functions
const crearFruta = () =>{
    celdas[frutaPosicion].classList.remove('fruta');
    frutaPosicion = Math.trunc(Math.random()*celdas.length);
    celdas[frutaPosicion].classList.add('fruta');
}

const verificarFruta = ()=>{
    if(actualPosicion === frutaPosicion){
        crearFruta();
        score++;
        document.getElementById('score').innerHTML = score;
        speed = 1000/(score+1);
        if(speed<200){
            speed = 200;
        }
    }
}

const render = (actualPosicion, status) =>{
    if(score===0){
        switch(status){
            case 1:
                celdas[actualPosicion-1].classList.remove('pj');
                celdas[actualPosicion].classList.add('pj');              
                break;
            case 2: 
                celdas[actualPosicion+1].classList.remove('pj');
                celdas[actualPosicion].classList.add('pj');
                break;
            case 3:
                celdas[actualPosicion+20].classList.remove('pj');
                celdas[actualPosicion].classList.add('pj');
                break;
            case 4:
                celdas[actualPosicion-20].classList.remove('pj');
                celdas[actualPosicion].classList.add('pj');
                break;
        }
    }else {
        celdas[ubicacion[ubicacion.length-1]].classList.add('pj');
        celdas[actualPosicion].classList.add('pj');
        celdas[ubicacion[ubicacion.length-(1+score)]].classList.remove('pj');
        if(score>=1){
            for(x=ubicacion.length; x>ubicacion.length-(1+score); x--){
                if(actualPosicion===ubicacion[x]){
                    alert('has perdido, te mordiste la colita');
                        clearInterval(intervaloIzq);
                        clearInterval(intervaloArriba);
                        clearInterval(intervaloAbajo);
                        clearInterval(intervaloDcha);
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                }
            }
        }
    }
}

//Moves
const movimientoDerecha = ()=>{
    intervaloDcha = setInterval(() => {
        try {
            actualPosicion++;
            render(actualPosicion, 1);
            verificarFruta();
            muro(actualPosicion);
            console.log(actualPosicion);
            console.log(celdas.length)    
        } catch (error) {
            muro(actualPosicion);
        }
    }, speed);
} 
const movimientoIzquierda = ()=>{
    intervaloIzq = setInterval(() => {
        try {
            actualPosicion--;
            render(actualPosicion, 2);
            verificarFruta();
            muro(actualPosicion);
            console.log(actualPosicion);
            console.log(celdas.length)
        } catch (error) {
            clearInterval(intervaloIzq);
            muro(actualPosicion)
        }
    }, speed);
} 
const movimientoArriba = ()=>{
    intervaloArriba = setInterval(() => {
        try {
            actualPosicion-=20;
            render(actualPosicion, 3);
            verificarFruta();
            muro(actualPosicion);
            console.log(actualPosicion);
            console.log(celdas.length)
        } catch (error) {   
            clearInterval(intervaloArriba);
            muro(actualPosicion)
        }
    }, speed);
}
const movimientoAbajo = ()=>{
    intervaloAbajo = setInterval(() => {
        try {
            actualPosicion+=20;
            render(actualPosicion, 4);
            verificarFruta();
            muro(actualPosicion);
            console.log(actualPosicion);
            console.log(celdas.length)
        } catch (error) {
            clearInterval(intervaloAbajo);
            muro(actualPosicion);
        }
    }, speed);
}
//movement gestion
const paredX = (verificador) =>{
        if(verificador === true){
            movimientoDerecha();
        }else{
            movimientoIzquierda();    
        }
}
const paredY = (verificador) =>{
    if(verificador === true){
        movimientoArriba();
    }else{
        movimientoAbajo();
    }
}
//A big wall like Donald Trump want
const muro = () =>{
    ubicacion.push(actualPosicion);
    if(actualPosicion<0){
        alert('has perdido');
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
    if(actualPosicion>celdas.length){
        alert('has perdido');
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
    switch (ubicacion[ubicacion.length-1]) {
            case 19:
            case 39:
            case 59:
            case 79:
            case 99:
            case 119:
            case 139:
            case 159:
            case 179:
            case 199:
            case 219:
            case 239:
            case 259:
            case 279:
            case 299:
            case 319:
            case 339:
            case 359:
            case 379:
            case 399:
                lastNone = true;
                if(lastNone==true && lastPar==true){
                    clearInterval(intervaloIzq);
                    clearInterval(intervaloArriba);
                    clearInterval(intervaloAbajo);
                    clearInterval(intervaloDcha);
                    alert('has perdido');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
                break;
            case 20:
            case 40:
            case 60:
            case 80:
            case 100:
            case 120:
            case 140:
            case 160:
            case 180:
            case 200:
            case 220:
            case 240:
            case 260:
            case 280:
            case 300:
            case 320:
            case 340:
            case 360:
            case 380:
            case 400:
                lastPar= true;
                if(lastNone==true && lastPar==true){
                        alert('has perdido');
                        clearInterval(intervaloIzq);
                        clearInterval(intervaloArriba);
                        clearInterval(intervaloAbajo);
                        clearInterval(intervaloDcha);
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    }
                break;
            default:
                lastPar = false;
                lastNone = false;
        }
    console.log(ubicacion);
    console.log(lastNone, lastPar);
}
//First execution functions
document.addEventListener('DOMContentLoaded', ()=>{
    crearFruta();
    const moverPj = (event) =>{
        switch(event.keyCode){
            case 97:// Esta es la A
                clearInterval(intervaloDcha);
                clearInterval(intervaloArriba);
                clearInterval(intervaloAbajo);
                if(moveReIzq===false){
                    moveReIzq = true;
                    moveReDcha = false;
                    moveReUp = false;
                    moveReDown = false;
                    paredX(false);    
                }
            break;
            case 115:// esta es la S
                clearInterval(intervaloArriba);
                clearInterval(intervaloDcha);
                clearInterval(intervaloIzq);
                if(moveReDown===false){
                    moveReIzq = false;
                    moveReDcha = false;
                    moveReUp = false;
                    moveReDown = true;
                    paredY(false);
                }
                break;
            case 100:// Esta es la D           
                clearInterval(intervaloIzq);
                clearInterval(intervaloArriba);
                clearInterval(intervaloAbajo);
                if(moveReDcha===false){
                    moveReIzq = false;
                    moveReDcha = true;
                    moveReUp = false;
                    moveReDown = false;
                    paredX(true);
                }
                break;
            case 119:// Esta es la W
                clearInterval(intervaloIzq);
                clearInterval(intervaloDcha);
                clearInterval(intervaloAbajo);
                if(moveReUp===false){
                    moveReIzq = false;
                    moveReDcha = false;
                    moveReUp = true;
                    moveReDown = false;
                    paredY(true);
                }   
                break;
        }
        console.log(actualPosicion);
        console.log(celdas.length)
    }
    document.addEventListener('keypress', moverPj);
})
