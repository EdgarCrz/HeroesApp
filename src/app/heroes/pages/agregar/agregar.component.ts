import { Component, Input } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class AgregarComponent {
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };
  constructor(
    private heroesService: HeroesService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  // para poder leer un URL ocupamos inyectar  ActivatedRoud que tiene una propiedad que nos permite realizar esta accion

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return;
    }
    // si no estamos en editar, no hagas nada solo return, en caso contrario el script de abajo
    // el codigo de abajo solo deberia mostrarse en caso de estar en el path /editar
    this.ActivatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroePorId(id)))
      .subscribe((heroe) => (this.heroe = heroe));
    // Tenemos una funcion flecha switchMap y como parametro le damos un id desestructurado, accedemos al servicio, en especifico a su metodo "getHeroePorId" y le pasamos el parametro y nos suscribimos a lo que retorne este metodo(en este caso un heroe) como estamos suscritos, al terminar se ejecutara otra funcion flecha la cual recibe como parametro un heroe y solo declaramos que nuestra propiedad local "heroe" es igual a lo que nos estan mandando de nuestro servicio
    // switchMap: funcion de alto nivel: Una función de alto nivel es una función que, o bien devuelve otra función, o acepta una función como parámetro
    //Los operadores de alto nivel se utilizan para manejar un Observable de Observables.
    // mas info: https://medium.com/puntotech/todo-sobre-switchmap-y-compa%C3%B1%C3%ADa-2af03cedc2be#:~:text=switchMap%20es%20un%20operador%20de%20alto%20nivel.&text=T%C3%A9cnicamente%2C%20nos%20estamos%20suscribiendo%20al,next%20en%20el%20m%C3%A9todo%20suscribe.
  }
  // .pipe es para añadir mas operadores en este caso un switchMap nos permite recibir un observable y regresar otro observable
  //al switchMap le mandamos el id(ya desestructurado) y accedemos al metodo "getHeroePorId" mandandole el id(para ver que hace vaya a "heroes.service.ts")

  // ¿Que es el constructor y que es el ngOnInit() por si alguna vez se te olvida: https://medium.com/zurvin/cu%C3%A1l-es-la-diferencia-entre-ngoninit-y-constructor-en-angular-2f7ce3d986b7
  @Input() heroerecibe!: Heroe;

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }
    // esta es una pequeña validacion, en caso de que el "superhero" venga vacio, simplemente no hagas nada

    //ACTUALIZAR
    if (this.heroe.id) {
      this.heroesService
        .actualizarHeroe(this.heroe)
        .subscribe((heroe) => this.mostrarSnackBar('Registro Actualizado'));
    } else {
      //CREAR
      this.heroesService.agregarHeroe(this.heroe).subscribe((heroe) => {
        this.router.navigate(['/heroes/editar', heroe.id]);
        // una vez creado, este script nos redirigirá a el path de actualizar por si ocupamos actualizarlo, gracias a la importacion del modulo router y a su metodo navigate, ya solo pusimos el path al que queremos ir y le mandamos el id del heroe
        this.mostrarSnackBar('Registro Creado');
      });

      // En idioma humano lo que dice aqui arriba es:
      // eccede al servicio "heroeService" especificamente a su method "agregarHeroe" mandale como parametro el objeto
      // heroe y create una subscripcion(cual suscripcion de revistas semanales) este subscribe va a recibir como parametro una respuesta
      // que nos esta mandando el servicio
      // por ultimo se creo una funcion flecha que imprime en consola un texto "respuesta" y le añadimos la respuesta que nos manda el servicio
    }
  }
  borrarHeroe() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe,
      // la data solo la mandamos para los textos en el html
    });
    // con el dialog.open estoy abriendo mi componente html "ConfirmarComponent" y ahi esta el codigo
    // que se muestra en pantalla con sus botones y todo, le pasamos parametros como el tamaño y como
    //  esto es un objeto, le podemos pasar una propiedad en este caso "this.heroe" y lo pasamos como "data"

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.heroesService
          .BorrarHeroe(this.heroe.id!)
          .subscribe((resp) => this.router.navigate(['/heroes']));
      }
      // al "dialog" le añadimos el metodo "afterClosed()" que es un observable que nos indica cuando el dialogo se ha cerrado
      // y nos suscribimos a su respuesta, cuando nos devuelve el parametro que es un valor booleano
      // podemos hacer una funcion flecha y evaluar con un if si el valor con un if
      // si es true entonces ejecuta el script de "borrarHeroe()"
    });
  }

  mostrarSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'ok!', { duration: 2500 });
  }
  // validacion de acciones: importamos el modulo de snackBar, declaramos un metodo al cual le pasamos como parametro un mensaje de tipo string
  // accedemos a la propiedad snackBar especificamente a su metodo open, mostramos lo que nos mandan como parametro
  // y aparte mostrara un mensaje predefinido aqui(que es clickeable para cerrarlos) y por ultimo añadimos las configuraciones las cuales son un objeto
  //  y tiene diversas propiedades, en este caso usamos duration para definir la duracion vlr y el tiempo en milisegundos
}
