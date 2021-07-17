import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ArchivoService } from '../services/archivo.service';
import { SubirArchivoComponent } from '../subir-archivo/subir-archivo.component';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent implements OnInit {

  constructor(private archivoService:ArchivoService,private dc: ChangeDetectorRef,
    public dialog: MatDialog ) { }
  archivos:any;
  ngOnInit(): void {
    this.listArchivos();
  }
  listArchivos():void{
    this.archivoService.listArchivos().subscribe(data=>{
      this.archivos = data;
      console.log(this.archivos)
      this.dc.detectChanges();
    })
  }

  openDialog():void{
    const dialogRef = this.dialog.open(SubirArchivoComponent,{});
    dialogRef.afterClosed().subscribe(res=>{
      this.listArchivos();
    })
  }

  abrirNuevoTab(link: any) {
    // Abrir nuevo tab
    let win = window.open(link, '_blank')!;
    // Cambiar el foco al nuevo tab (punto opcional)
    win.focus();
  }

  delete(num: number) {
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
        Swal.fire(
          'Eliminado!',
          'El registro ha sido eliminado.',
          'success'
        )
        this.archivoService.delArchivo(num).subscribe(
          res => {
            this.listArchivos();
          }
        )
      }
    })
  }
}
