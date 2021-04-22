import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.verificaAutenticacion().pipe(
      tap((estaAutenticado) => {
        if (!estaAutenticado) {
          this.router.navigate(['./auth/login']);
        }
      })
    );
    // FALTA COMENTAR ESTA SECCION Y AGREGAR EL localstorage.clear() pa cerrar sesion bien esto lo comentan en los comentarios valga la rebusnancia

    // if (this.authService.auth.id) {
    //   return true;
    // }
    // console.log('Bloqueado por el AuthGuard - CanActivate');
    // return false;
    // REVISAR DIFERENCIA ENTRE EL LOAD Y EL ACTIVATE, (porque basicamente si implemento igual, obviamente si hubo dif en funcion)
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.verificaAutenticacion().pipe(
      tap((estaAutenticado) => {
        if (!estaAutenticado) {
          this.router.navigate(['./auth/login']);
        }
      })
    );
    // if (this.authService.auth.id) {
    //   return true;
    // }
    // console.log('Bloqueado por el AuthGuard - Canload');
    // return false;
  }
  // canLoad/puede cargar: en este caso este metodo es una validacion que nos permitira o no cargar la pantalla con la ruta a la que queremos acceder
  // siempre y cuando este metodo nos retorne un true, en este caso inyectamos nuestro servicio "auth"
  // para retornar true o false en caso de que exista el id del usuario
}

// este modulo es un Guard/Guardia, que basicamente hace esa funcion estar de guardia en nuestras rutas
// para darle mas seguridad frontal y que no puedan accesar si no accedieron de la forma adecuada
// cabe recalcar que este modulo es como si fuera un servicio y para utillizarlo lo hace de la misma manera
