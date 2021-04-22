import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanLoad } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthGuard } from './auth/guards/auth.guard';

// aqui estoy declarando "routes" que es de tipado "Routes" que es un modulo que importamos para manejar las rutas
const routes: Routes = [
  {
    // path/camino: al entrar en el path "auth" la pagina nos redigira hacia Un objeto que especifica rutas secundarias(hijas) con carga perezosa.
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    // cuando alguien entre a auth la pagina recargara a los hijos, en este caso "auth.module" porque este ya tiene importados el "auth-routing.module"( osea cargamos la principal de ese module )
    // en si "() => import('./auth/auth.module')" es una promesa y cuando se carge en memoria, then/entonces regresame el module "m.AuthModule"
  },
  {
    path: 'heroes',
    loadChildren: () =>
      import('./heroes/heroes.module').then((m) => m.HeroesModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    // canLoad:Una matriz de tokens DI utilizados para buscar manejadores CanLoad (), con el fin de determinar si el usuario actual puede cargar el componente. De forma predeterminada, cualquier usuario puede cargar.
    //  AuthGuard: en este caso es el token que buscaba el "canLoad", basicamente estamos utilizando la clase AuthGuard
    // cuando alguien entre a auth la pagina recargara a los hijos, en este caso "auth.module" porque este ya tiene importados el "auth-routing.module"( osea cargamos la principal de ese module )
    // en si "() => import('./auth/auth.module')" es una promesa y cuando se carge en memoria, entonces = .then regresame el module "m.AuthModule"
  },
  {
    // esta es la pagina de error cualquier cosa que metan en la ruta que no este especificada nos mandara aquí
    path: '404',
    component: ErrorPageComponent,
  },
  {
    // "**" basicamente es un comodin el cual indica que cualquier cosa rara en los path´s nos mandara al path 404
    path: '**',
    component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // importamos RouterModule.forRoot(rutasprincipales) y le pasamos las rutas que creamos "routes"
  exports: [RouterModule], // y exportamos Router module para que todas las paginas tengan acceso a el ya que esta en la raiz
})
export class AppRoutingModule {}
