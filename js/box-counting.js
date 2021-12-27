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
 * 
 * 
 * 
*/



// -----------------------------------------------------------------------------



