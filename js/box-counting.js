/** PSEUDO-CÓDIGO BOX COUNTING
 * 
 * imagen = nuestra imagen en cuestion
 * dividimos en cuartos la imagen
 * if cuarto has BW:
 *      counter = counter+1
 * else:
 *      break
 * 
 * | 0 0 | 0 0 | 0 1 | 0 0 |
 * | 0 0 | 0 0 | 0 1 | 0 0 |
 * -------------------------
 * | 0 0 | 0 0 | 0 1 | 0 0 |
 * | 0 0 | 0 0 | 0 1 | 0 0 |
 * -------------------------
 * | 0 0 | 0 0 | 0 1 | 0 0 |
 * | 0 0 | 0 0 | 0 1 | 0 0 |
 * -------------------------
 * | 0 0 | 0 0 | 0 1 | 0 0 |
 * | 0 0 | 0 0 | 0 1 | 0 0 |
 * 
 * 0, 4, 32, 36
 * 
 * imagen = matriz de píxeles
 * resultados = variable global de lista de números enteros: [...]
 * [0,0,0,0,0,0,0,0,0,0,0,0]
 * n0<n1<n2<n3<n4<n5
 * 
 * funcion box(imagen, piX, piY, pfX, pfY profundidad):
 *      if imagen has Black & White:
 *          resultado = 0
 *          dividimos en cuartos la imagen
 *          resultado += box(cuarto1,X,Y, profundidad+1)
 *          resultado += box(cuarto2,X,Y, profundidad+1)
 *          resultado += box(cuarto3,X,Y, profundidad+1)
 *          resultado += box(cuarto4,X,Y, profundidad+1)
 *          resultados[profundidad] = resultados[profundidad] + resultado
 *          return 1
 *      else:
 *          return 0
 * 
 * 
 * imagen
 * imagen-prof1 = copy(imagen) //los aciertos del nivel 
 * 
 * grid
 * 
 * superposicion
 * 
 * document.getElementById('superposicion').addClass('grid-template-rows: repeat(4, ));
 * document.getElementById('superposicion').innerHTML += '<div id='rejillaI'>
 * 
 * profundidad0 = 4^0
 * profundidad1 = 4^1
 * profundidad2 = 4^2
 * profundidad3 = 4^3
 * profundidad4 = 4^4
 * profundidad10 = 4^10
*/

const PROFUNDIDAD_LIMITE = 20;
let resultados;
let indices = [];

function sum(ns){
  let n = 0;
  for(let i = 0; i < ns?.length; i++){
    n += ns[i];
  }
  return n;
}

function variance(ns){
  let n = 0;
  for(let i = 0; i < ns.length; i++){
    n += Math.pow(ns[i], 2);
  }

  return (n/ns.length) - Math.pow(mean(ns), 2);
}

function covariance(ns, ms){
  let n = 0;
  for(let i = 0; i < ns.length; i++){
    n += ns[i] * ms[i];
  }
  return (n/ns.length) - mean(ns) * mean(ms);
}

function mean(ns){
  return sum(ns)/ns.length;
}

function getFractalDimension(x, y){
  let mean_x = mean(x);
  let mean_y = mean(y);
  let b = covariance(x, y) / variance(x);
  let a = mean_y - b*mean_x;
  return -b/a;
}

function createMatrix(rows, cols){
  let matrix = [];
  let row;

  for(let i = 0; i < rows; i++){
    row = [];
    for(let j = 0; j < cols; j++){
      row.push(0);
    }
    matrix.push(row);
  }

  return matrix;
}

function boxCounting(){
  let width = canvasResult.width;
  let height = canvasResult.height;

  let canvasColor = canvasResult.getContext("2d").getImageData(0,0, width, height);
  let matrix = rgbaToBw(canvasColor.data, width);

  resultados = [];
  escalas = [];
  for(let i = 0; i < PROFUNDIDAD_LIMITE; i++){
    resultados.push(0);
    indices.push([]);
  }

  let x = [];
  let y = [];

  _boxCounting(matrix, 0, 0, width, height, 0, 0);

  for(let i = 0; i < PROFUNDIDAD_LIMITE; i++){
    if(resultados[i] == 0 
        || isNaN(resultados[i]) 
        || ( i > 0 && resultados[i] < resultados[i-1]) ){
      break;
    }
    x.push(Math.log(resultados[i]));
    y.push(Math.log(Math.pow(4, i+1)));
  }

  // console.log(resultados);
  // console.log(x, y)
  // console.log(getFractalDimension(x, y));
  // console.log(indices);
  crearGrid(width, height, x.length-1);

  return getFractalDimension(x,y);
}

function _boxCounting(matrix, piX, piY, pfX, pfY, profundidad){
  if(profundidad > PROFUNDIDAD_LIMITE){ // HAY QUE PONER BIEN ESTO (PROFUNIDAD_LIMITE)
    return 0;
  }
  let hasW = false;
  let hasB = false;

  for(let i = piY; i < pfY; i++){
    for(let j = piX; j < pfX; j++){
      hasW |= matrix[i][j];
      hasB |= !matrix[i][j];
      if(hasW && hasB){ break; }
    }
    if(hasW && hasB){ break; }
  }

  if(hasW && hasB){
    let resultado = 0
    let pmX = Math.floor((pfX+piX)/2);
    let pmY = Math.floor((pfY+piY)/2);

    resultado += _boxCounting(matrix, piX, piY, pmX, pmY, profundidad+1); // Primer cuarto
    resultado += _boxCounting(matrix, pmX, piY, pfX, pmY, profundidad+1); // Segundo cuarto
    resultado += _boxCounting(matrix, piX, pmY, pmX, pfY, profundidad+1); // Tercer cuarto
    resultado += _boxCounting(matrix, pmX, pmY, pfX, pfY, profundidad+1); // Cuarto cuarto
    resultados[profundidad] += resultado;

    let trozos = Math.pow(2, profundidad);
    let limiteAncho = Math.floor(matrix[0].length/trozos);
    let limiteAlto = Math.floor(matrix.length/trozos);
    let j = Math.floor(piX/limiteAncho);
    let i = Math.floor(piY/limiteAlto);
    let celda = i*Math.pow(2, profundidad)+j;
    indices[profundidad].push(celda);
    
    return 1;
  }
  else {
    return 0
  }

}

//  Primer cuarto | Segundo cuarto
//  ------------------------------
//  Tercer cuarto | Cuarto cuarto

function rgbaToBw(data,width){
  let lista = [];
  let matrix = [];
  
  for(let i = 0; i < data.length; i += 4){
    lista.push(data[i]+data[i+1]+data[i+2] > 0 ? 1:0);
  }

  for(let e = 0; e < lista.length; e+=width){
    matrix.push(lista.slice(e,e+width));
  }

  return matrix;
}

function crearGrid(width, height, profundidad){
  console.log(indices[profundidad]);
  let celdas = Math.pow(2, profundidad);
  let rejilla = document.getElementById('rejilla');
  let style = '';
  style += 'width:'+width.toString()+'px;';
  style += 'height:'+height.toString()+'px;';
  style += 'grid-template-rows:repeat('+celdas.toString()+',1fr);';
  style += 'grid-template-columns:repeat('+celdas.toString()+',1fr);';
  rejilla.style = style;
  rejilla.innerHTML = '';

  for(let i = 0; i < celdas*celdas; i++){
    if(indices[profundidad].includes(i)){
      rejilla.innerHTML += '<div class="celda-activada"></div>';
    }else{
      rejilla.innerHTML += '<div class="celda-desactivada"></div>';
    }
  }
}

/*

profundidad = 0
0

profundidad = 1
0 0o1 | 1 0o1
-----
2 | 3


profundidad = 2
0  1 | 2   3 | 4  5 | 6  7
8  9 | 10 11 | 12 13| 14 15
---------------------------

tableroSiguientePieza.innerHTML += '<div id="celda'+(i*6+j)+'"></div>'


for(i = 0){
  i dentro de indices
    tableroSiguientePieza.innerHTML += '<div class="activo"></div>'
  si no
    tableroSiguientePieza.innerHTML += '<div class="desactivado"></div>'
}

                 |
 *   | 0 0 | 0 0 | 0 1 | 0 0 |
 *   | 0 0 | 0 0 | 0 1 | 0 0 |
 *   -------------------------
 *   | 0 0 | 1 0 | 0 1 | 0 0 |
 *   | 0 0 | 0 0 | 0 1 | 0 0 |
 * -----------------------------
 *   | 0 0 | 0 0 | 0 1 | 0 0 |
 *   | 0 0 | 0 0 | 0 1 | 0 0 |
 *   -------------------------
 *   | 0 0 | 0 0 | 0 1 | 0 0 |
 *   | 0 0 | 0 0 | 0 1 | 0 0 |
 *               |
 * 
 * 0 | 1
 * -----
 * 2 | 3
 * 
 * 0  | 1  | 2  | 3
 * -----------------
 * 4  | 5  | 6  | 7
 * -----------------
 * 8  | 9  | 10 | 11
 * -----------------
 * 12 | 13 | 14 | 15
 * 
 * 0 | 1 |    2 | 3    | 4 | 5 |    6 | 7 |
 * 8 | 9


*/