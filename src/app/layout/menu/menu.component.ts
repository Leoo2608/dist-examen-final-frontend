import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../modules/login/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  
  constructor(private authService:AuthService, private router:Router){}
  public logout(){
    this.authService.logout();
    this.router.navigate(['']);
  }
  nombre!:string;
  apellido!:string;
  ngOnInit():void{
    const nombres = this.authService.usuario.nombres;
    const apellidos = this.authService.usuario.apellidos;
    this.nombre =  nombres.split(" ")[0]
    this.apellido = apellidos.split(" ")[0]
  }

}
