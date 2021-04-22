import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .container {
        margin: 10px;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  get auth() {
    return this.authService.auth;
  }
  // aqui accedemos a la propiedad "auth"del servicio "authService" ña cual simplemente nos esta devolviendo al usuario,
  // para poder incrustarlo en el html
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this.router.navigate(['./auth/login']);
  }
}
