import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.css'],
})
export class ConfirmarComponent implements OnInit {
  constructor(
    private DialogRef: MatDialogRef<ConfirmarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Heroe // esta es una inportacion que sirve para traer la data de el componente padre "agregar.component.ts"
  ) {}
  // inyectamos  el inject "MAT_DIALOG_DATA" solo para traernos el heroe (data) y asi poder usar sus propiedades en este componente

  ngOnInit(): void {}

  borrar() {
    this.DialogRef.close(true);
    // estoy mandando como parametro un argumento "true" para indicando de qu efectivamente fue cerrado
    // con esto en agregar.components, podemos usar ese parametro para realizar una accion
  }
  cerrar() {
    this.DialogRef.close();
  }

  // matdialogref sirve para cerrar el cuadro de dialogo que creamos
}
