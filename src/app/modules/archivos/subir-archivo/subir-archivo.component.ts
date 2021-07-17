import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import { AuthService } from '../../login/services/auth.service';
import { Archivo } from '../models/archivo';
import { ArchivoService } from '../services/archivo.service';
@Component({
  selector: 'app-subir-archivo',
  templateUrl: './subir-archivo.component.html',
  styleUrls: ['./subir-archivo.component.css']
})
export class SubirArchivoComponent implements OnInit {

  constructor(private authService: AuthService, private archivoService: ArchivoService, public dialogRef: MatDialogRef<SubirArchivoComponent>) { }
  archivoModel: Archivo = new Archivo();
  ngOnInit(): void {
    this.archivoModel.idusuario = this.authService.usuario.idusuario;
    $('#btn-falso').on("click", function () {
      $('#btn-verdadero').trigger('click');
    });
    $('#btn-verdadero').on("change", function () {
      if ($('#btn-verdadero').val()) {
        $('#custom-text').html("Listo.");
      } else {
        $('#custom-text').html("No ha elegido ningún archivo.");
      }
    })
  }

  selectedFile!: File;
  onFileSelect(event: any) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }
  addArchivo() {
    if (this.selectedFile == null || this.archivoModel.nombre == null
      || this.archivoModel.nombre.trim()=="") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Llene todos los campos porfavor.',
      })
    } else if (this.selectedFile.type != 'application/pdf' && this.selectedFile.type != 'image/png' && this.selectedFile.type != 'image/jpeg') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Solo se admiten archivos de tipo PDF, PNG y JPG!',
      })
    } else {
      const fd = new FormData();
      if (this.selectedFile.type == 'application/pdf') {
        this.archivoModel.tipo = 'PDF';
      } else if (this.selectedFile.type == 'image/jpeg') {
        this.archivoModel.tipo = 'JPEG';
      } else if (this.selectedFile.type == 'image/png') {
        this.archivoModel.tipo = 'PNG';
      }
      fd.append('document', this.selectedFile, this.selectedFile.name);
      this.archivoService.uploadDoc(fd).subscribe(res => {
        if (res) {
          this.archivoModel.url = String(res);
          console.log(this.archivoModel)
          this.archivoService.addArchivo(this.archivoModel).subscribe(res => {
            this.salirDialog();
            Swal.fire('Nuevo Archivo', `Archivo ${this.archivoModel.nombre} subido con exito`, "success")
          })
        }
      })
    }


  }
  public salirDialog() {
    this.dialogRef.close();
  }
}
