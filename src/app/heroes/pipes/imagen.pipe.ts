import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(heroe: Heroe): string {
    if (!heroe.id && !heroe.alt_img) {
      return `/assets/no-image.png`;
    } else if (heroe.alt_img) {
      return heroe.alt_img;
    } else {
      return `/assets/heroes/${heroe.id}.jpg`;
    }
    // en caso de que no exista el here.id y tampoco el heroe.alt_img entonces retorna la no-image.png
    //si no regresa la imagen alterna
    //en otro caso devuelve la imagen.id
  }
}

// basicamente esto se creo con ng g p heroes/pipes/imagen  y te crea todo y las importaciones  solo necesitamos
// recibir el parametro "heroe" de tipo "Heroe" y e indicamos que el resultado va a ser de tipo string
// retornamos el string(osea el link ya armado con lo que deseemos y en este caso ahi incluimos el paramtro que nos estan mandando y la propiedad que ocupamos)
