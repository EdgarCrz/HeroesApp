import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';

// basicamente declaramos otras rutas como las paternas, pero con la diferencia de que aqui estamos usando children
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'registro',
        component: RegistroComponent,
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
];

@NgModule({
  // y tenemos que importar y declarar que son rutas hijas
  imports: [RouterModule.forChild(routes)],
  // ademas de importar el "RouterModule"para que puedan funcionar las rutas
  exports: [RouterModule],
})
export class AuthRoutingModule {}
