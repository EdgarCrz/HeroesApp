import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroe } from '../interfaces/heroes.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
// cambiamos a prod para poder accesar a los datos en un server fake en github.

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}
  // inyectamos el servicio httpclient para poder hacer las peticiones http
  getHeroes(): Observable<Heroe[]> {
    // esto es un metodo observable(osea que podemos visualizar su ejecucion accediendo desde otro modulo)
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`);

    // return this.http.get<Heroe[]>('http://localhost:3000/heroes');  esta era el path en duro, de la nueva manera con la VARIABLE DE ENTORNO, cambiara cuando pasemos de entorno de desarrollo a entorno de produccion para facilitarnos las cosas

    // cuando lo empleemos el servicio en otro lado nos retornara la peticion http
  }

  getHeroePorId(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`);
    // return this.http.get<Heroe>(`http://localhost:3000/heroes/${id}`);  esta era el path en duro, de la nueva manera con la VARIABLE DE ENTORNO, cambiara cuando pasemos de entorno de desarrollo a entorno de produccion para facilitarnos las cosas
  }

  // creamos un nuevo metodo "getHeroePorId" el cual recibe un parametro "id" de tipo string y el resultado de esto es u Observable de tipo "Heroe"
  // Este metodo return/retorna una peticion http con el path indicado incluyendo el id
  // cuando lo declaramos de tipo Observable estamos indicando que podemos literal observar su estado desde otro modulo y reaccionar a su cambio ejecutanto alguna funcion o methodo

  getSugerencias(termino: string): Observable<Heroe[]> {
    // se crea este methodo el cual recibe "termino" de tipo string y declaramos lo que va a devolver como resultado, un observable o un arreglo de heroes
    return this.http.get<Heroe[]>(
      `http://localhost:3000/heroes?q=${termino}&_limit=6`
    );

    // esto es una peticion post, con la cual estamos OBTENIENDO INFO del heroe que nos mandan a la base de datos

    // basicamente esto dice "retorna" una peticion http de tipo heroe y es un array ya que es un conjunto de datos
    // httpCliente:Realiza solicitudes HTTP. Este servicio está disponible como una clase inyectable, con métodos para realizar solicitudes HTTP. Cada método de solicitud tiene varias firmas y el tipo de devolución varía según la firma que se llama (principalmente los valores de observe y responseType).
    // el path desmembrado nos da informacion e instrucciones de como tiene que ser esa peticion
    // como "?q=" que es una query en base al "termino que estamos incrustando" o "&_limit" con el delimitamos la cantidad de objetos que recibimos
  }
  agregarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(`${this.baseUrl}/heroes`, heroe);
    // esto es una peticion post, con la cual estamos GUARDANDO el heroe en la base de datos
  }
  actualizarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.put<Heroe>(`${this.baseUrl}/heroes/${heroe.id}`, heroe);
    // esto es una peticion pUT, con la cual estamos ACTUALIZANDO el heroe que nos mandan a la base de datos
  }

  BorrarHeroe(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/heroes/${id}`);
    // esto es una peticion delete, con la cual estamos borrando el heroe
    // solo ocupamos que nos manden el id
  }
}
