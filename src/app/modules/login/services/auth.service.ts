import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serviceEndPoint } from 'src/app/routes/endpoint';
import { Usuario } from '../models/usuario';


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user'
const AUTH_API = serviceEndPoint;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(AUTH_API+'/', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions)
  }

  private _usuario: Usuario = {
    idusuario:0,
    username:'',
    nombres:'Loading...',
    apellidos:'',
    telefono:'',
    idpersona:0
  }

  logout(): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    //set userIsLogged = false;
  }

  public getTokenData(token: string): any {
    if (token != null) {
      return JSON.parse(atob(token.split(".")[1]));
    }
    return null;
  }

  public saveToken(token: string): void {
    sessionStorage.setItem(TOKEN_KEY, token);
  }
  public saveUser(token: any): void {
    let data = this.getTokenData(token);
    this._usuario.idusuario = data.usuario.idusuario;
    this._usuario.nombres = data.usuario.nombres;
    this._usuario.username = data.usuario.username;
    this._usuario.apellidos = data.usuario.apellidos;
    this._usuario.idpersona=data.usuario.idpersona;
    this._usuario.telefono = data.usuario.telefono;
    sessionStorage.setItem(USER_KEY, JSON.stringify(this._usuario));
  }

  public dataSession():boolean{
    if(sessionStorage.getItem(USER_KEY)!=null && sessionStorage.getItem(TOKEN_KEY)!=null){
      return true;
    }else{
      return false;
    }
  }
  public get usuario(): Usuario {
    if (this._usuario.nombres != 'Loading...') {
      return this._usuario
    } else if (this._usuario.nombres == 'Loading...' && sessionStorage.getItem(USER_KEY) != null) {
      const userJson = sessionStorage.getItem(USER_KEY);
      this._usuario = userJson !== null ? JSON.parse(userJson) : new Usuario();
      return this._usuario;
    }
    return this._usuario
  }

} 
