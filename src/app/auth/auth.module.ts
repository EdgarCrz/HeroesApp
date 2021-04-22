import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [LoginComponent, RegistroComponent],
  imports: [CommonModule, AuthRoutingModule, MaterialModule],
})
export class AuthModule {}

// este seria el modulo principal de un hijo, el modulo padre es y siempre sera app.module.ts
// aqui estamos importando el "AuthRoutingModule" para hacer uso de las rutas(hijas) que declaramos ahi
