import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import Swal from 'sweetalert2';
import { AuthService } from '../../login/services/auth.service';
import { Correo } from '../models/correo';
import { CorreoService } from '../services/correo.service';

export interface CorreoF {
  dest: string;
}
@Component({
  selector: 'app-correos',
  templateUrl: './correos.component.html',
  styleUrls: ['./correos.component.css']
})
export class CorreosComponent implements OnInit {

  constructor(private authService: AuthService, private correoService: CorreoService) { }
  correoModel: Correo = new Correo();
  ngOnInit(): void {
    this.correoModel.idusuario = this.authService.usuario.idusuario;
  }
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  correos: CorreoF[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      this.correos.push({dest: value});
    }
    // Clear the input value
    if(event.input){
      event.input.value = ''
    }
  }
  remove(correo: CorreoF): void {
    const index = this.correos.indexOf(correo);
    if (index >= 0) {
      this.correos.splice(index, 1);
    }
  }

  send(){
    for (let i = 0; i < this.correos.length; i++) {
      this.correoModel.destinatario = String(this.correos[i].dest)
      this.correoService.sendEmail(this.correoModel).subscribe(res=>{
        if(res){
          Swal.fire( {
            icon: 'success',
            title: 'Operación Exitosa!',
            text: 'Los mensajes se han enviado a los destinatarios'
          });
        }
      })

    }
  }
}
