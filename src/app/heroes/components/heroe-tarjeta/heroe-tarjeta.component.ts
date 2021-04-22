import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [
    `
      mat-card {
        margin-top: 20px;
      }
    `,
  ],
})
export class HeroeTarjetaComponent {
  @Input() heroerecibe!: Heroe;
  // si le quitamos el signo "!"dara error, signica le indicamos a TS que no se preocupe(por aquello del modo super estricto), eso significa que no esta inicializada en el constructor y no tiene porque ya que esta propiedad viene de otro lado
}

// basicamente en este componente solo lo creamos para modularizar un poco mas el codigo
// solo es para separar las tarjetas en un modulo que se puede reutilizar o si es necesario modificarle algo
//se copio el codigo html en el nuevo "heroe-tarjeta.component.html" y tambien fue necesario pasarle el heroe a este componente para que funcionara
// se mando con "@Input() heroe!: Heroe;" ´para recibir el dato
