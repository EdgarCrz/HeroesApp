import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';
import { switchMap } from 'rxjs/operators';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 10px;
      }
    `,
  ],
})
export class HeroeComponent implements OnInit {
  heroeResultado!: Heroe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private HeroeService: HeroesService, // inyectamos los servicios para poder usar sus methods
    private router: Router
  ) {}
  // la propiedad privavate "activatedRoute" de tipo ActivatedRoute
  // ActivatedRoute: Proporciona acceso a información sobre una ruta asociada a un componente que se carga en una toma de corriente.

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(console.log);    (esta forma es sin desestructurar el objeto)
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.HeroeService.getHeroePorId(id)))
      // desestructurar: Basicamente nos mandan el objeto y es como dice la palabra "desestructurar" como ir abriendolo para acceder al parte que nos interesa en este caso el id
      // .pipe es para añadir mas operadores en este caso un switchMap nos permite recibir un observable y regresar otro observable
      //al switchMap le mandamos el id(ya desestructurado) y accedemos al metodo "getHeroePorId" mandandole el id(para ver que hace vaya a "heroes.service.ts")
      .subscribe((heroe) => (this.heroeResultado = heroe));
    // me suscribo al .pipe y sus operadores para recibir un heroe, creé una funcion flecha donde indico que mi propiedad "heroeResultado" es igual al heroe que estoy recibiendo como argumento
  }
  regresar() {
    this.router.navigate(['/heroes/listado']);
  }
  // si, creé un methodo solo para regresar al listado, cuando pude haber utilizado un router link en "heroe.component.html" pero en el curso asi lo hicieron, tal vez sirva de refuerzo
}
