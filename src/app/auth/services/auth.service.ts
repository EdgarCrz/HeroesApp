import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
// aqui cambiaste para pasar de produccion / si le quitas el .prod  regresa a desarrollo(esto sea hace tambien en el servicio de heroes)
import { Auth } from '../interfaces/auth.interface';
import { tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;
  // declaramos una pripiedad de tipo Auth y esto puede ser nulo por eso se le marca que tambien puede ser indefined

  get auth(): Auth {
    return { ...this._auth! };
  }
  // esto es un getter y lo que hace una vez que es llamado es retornar el valor que contiene _auth
  // lleva ! para indicar que siempre tendra info
  constructor(private http: HttpClient) {}

  verificaAutenticacion(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      return of(false);
      // en esta forma de hacerlo nos explico el operador "of" para convertir valores en observables
      // la forma facil hubiera sido solo usar boolean como resultado de nuestro metodo y ya alv
    }
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      map((auth) => {
        this._auth = auth;
        // en este punto de la verificacion ya tenemos cargada la info del usuario, entonces
        // solo tenemos que asignar el valor de auth a _auth
        return true;
      })
      // este operador map trasforma lo que recibe y retorna un valor nuevo
      // basicamente si "auth" tiene un valor retorname true
    );
  }

  login() {
    return (
      this.http
        .get<Auth>(`${this.baseUrl}/usuarios/1`)
        // este metodo usa una clase httpClient la cual nos da acceso a peticiones http
        // de esta manera usamos get para traernos el objeto json con la informacion que ocupamos
        // construimos la url en base a nuestro archivo "enviroment" y le añadimos el path donde se encuentra lo que queremos
        .pipe(
          tap((auth) => (this._auth = auth)),
          tap((auth) => localStorage.setItem('token', auth.id))
          // este tap/grifo: "localStorage" de tipo Storage, es una variable, a la cual le aplicamos el metodo
          // "setItem()" para mandar al buscador web este valor "token"
        )

      // get: traemos el usuario de tipado Auth, pipe: lo pasamos por el method pipe, para poder usar
      // tap: tap crea efectos segundarios, en este caso cuando recibamos el "auth" de la peticion get el tap siempre va recibir el producto del operador anterior
      // creamos una funcion flecha, indicando que la propiedad "_auth" se va a llenar con lo que venga de la peticion
    );
  }

  logOut() {
    this._auth = undefined;
  }
}

// pipe
//el pipe/tuberia: basicamente va a ejecutar otros operadores en la secuencia/orden en el que se coloquen
// tap crea un efecto secundario antes de que se ejecute el subscribe de el login(creo)
// Documentacion de pipe,map y otros: https://www.tektutorialshub.com/angular/angular-observable-pipe/
