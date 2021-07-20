import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AuthService } from '../../login/services/auth.service';
import { ArchivoService } from '../services/archivo.service';
import { SubirArchivoComponent } from '../subir-archivo/subir-archivo.component';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent implements OnInit {

  constructor(private archivoService: ArchivoService, private dc: ChangeDetectorRef,
    public dialog: MatDialog, private authService: AuthService) { }
  archivos: any;
  idu: any;
  ngOnInit(): void {
    this.idu = this.authService.usuario.idusuario;
    this.listArchivos();
  }
  listArchivos(): void {
    this.archivoService.listArchivos(this.idu).subscribe(data => {
      this.archivos = data;
      console.log(this.archivos)
      this.dc.detectChanges();
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SubirArchivoComponent, {});
    dialogRef.afterClosed().subscribe(res => {
      this.listArchivos();
    })
  }

  abrirNuevoTab(link: any) {
    // Abrir nuevo tab
    let win = window.open(link, '_blank')!;
    // Cambiar el foco al nuevo tab (punto opcional)
    win.focus();
  }

  delete(num: number, idurl: any) {
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.archivoService.deleteLink(idurl).subscribe(res => {
          if (res) {
            this.archivoService.delArchivo(num).subscribe(res => {
              Swal.fire(
                'Eliminado!',
                'El registro ha sido eliminado.',
                'success'
              )
              this.listArchivos();
            })
          }
        })

      }
    })
  }
}
