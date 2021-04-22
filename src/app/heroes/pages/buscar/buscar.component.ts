import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [],
})
export class BuscarComponent implements OnInit {
  termino: string = '';

  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;

  constructor(private HeroesService: HeroesService) {}

  ngOnInit(): void {}

  buscando() {
    this.HeroesService.getSugerencias(this.termino.trim()).subscribe(
      (heroes) => (this.heroes = heroes)
    );
    //ocupamos el .trim() para eliminar espacios al inicio y al final
  }
  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.heroeSeleccionado = undefined;
      return;
    }
    const heroe: Heroe = event.option.value;
    // creamos una variable constante "heroe" de tipo Heroe que va a ser igual, y aqui entramos a las propiedades del $event
    // primero a event/ despues accedemos a option y por ultimo a value que es ahi donde estan los valor del objeto heroe
    this.termino = heroe.superhero;
    // por ultimo usamos nuestra propiedad "termino"(vacia hasta el momento) y ahi guardamos el heroe, solo la propiedad superhero
    // termino esta con el ngmodel lo cual hace que se introduzca en el input para completar el campo en automatico
    this.HeroesService.getHeroePorId(heroe.id!).subscribe(
      (heroe) => (this.heroeSeleccionado = heroe)
    );
  }
}
