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
      this.correos.push({ dest: value });
    }
    // Clear the input value
    if (event.input) {
      event.input.value = ''
    }
  }
  remove(correo: CorreoF): void {
    const index = this.correos.indexOf(correo);
    if (index >= 0) {
      this.correos.splice(index, 1);
    }
  }

  send() {
    if (this.correoModel.mensaje == null || this.correoModel.titulo == null
      || this.correoModel.mensaje.trim() == "" || this.correoModel.titulo.trim() == "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Llene todos los campos porfavor.',
      })
    } else if (this.correos.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un destinatario!',
      })
    } else {
      if(this.validar_emails() == false){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Destinatario(s) invalidos!',
        })
      }else{
        for (let i = 0; i < this.correos.length; i++) {
          this.correoModel.destinatario = String(this.correos[i].dest)
          console.log(this.correoModel.destinatario)
          this.correoService.sendEmail(this.correoModel).subscribe(res => {
            if (res) {
              Swal.fire({
                icon: 'success',
                title: 'Operación Exitosa!',
                text: 'Los mensajes se han enviado a los destinatarios'
              });
            }
          })
        }
      }
     
    }

  }
  validar_emails():boolean{
    var n = 0;
    for (let i = 0; i < this.correos.length; i++) {
      var email = String(this.correos[i].dest);
      if(this.pathEmail(email)==false){
        break;
      }else{
        n = n + 1;
      }
    }
    if(n == this.correos.length){
      return true;
    }else{
      return false;
    }
  }
  pathEmail(email:any) {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
  }
}
