import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
    `
      mat-card {
        margin-top: 20px;
      }
    `,
  ],
})
export class ListadoComponent implements OnInit {
  heroes: Heroe[] = [];
  // simplemente estoy declarando una propiedad que va a ser de tipo "Heroe" y va a ser un conjunto de elementos (array) y lo inicializmas vacio

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroesService
      // accedemos a la propiedad "heroeService" del servicio
      .getHeroes()
      // accedemos al metodo getHeroes()/traerHeroes() que nos trae via get(link) el objeto heroes(y todas sus propiedades)
      .subscribe((heroesResp) => (this.heroes = heroesResp));
    // Nos suscribimos a la respuesta de getHeroes() y obtenemos "heroesResp" y es una funcion felcha de una sola linea
    // La propiedad "heroes" this.heroes es igual a la respuesta del subscribe osea cargamos nuestra propiedad con lo que nos manden del servicio
  }
}
