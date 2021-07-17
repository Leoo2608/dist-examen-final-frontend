import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { serviceEndPoint } from 'src/app/routes/endpoint';
import { AuthService } from '../../login/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  constructor(private http:HttpClient, private authService:AuthService) { }
  private routeArchivo = 'archivos';
  private routeUpload = 'upload'
  private httpHeadersFile = new HttpHeaders({});
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  private grantAuthorization(){
    let t = this.authService.token;
    if(t!=null){
      return this.httpHeaders.append('Authorization','Bearer '+t);
    }
    return this.httpHeaders;
  }
  private grantAuthToFiles(){
    let t = this.authService.token;
    if(t!=null){
      return this.httpHeadersFile.append('Authorization','Bearer '+t);
    }
    return this.httpHeaders;
  }

  listArchivos():Observable<any>{
    return this.http.get<any>(`${serviceEndPoint}/${this.routeArchivo}`,{headers:this.grantAuthorization()});
  }

  uploadDoc(fd:any){
    return this.http.post(`${serviceEndPoint}/${this.routeArchivo}/${this.routeUpload}`, fd, {responseType:'text',headers:this.grantAuthToFiles()});
  }
  addArchivo(archivo:any):Observable<number>{
    return this.http.post<number>(`${serviceEndPoint}/${this.routeArchivo}`,archivo,{headers:this.grantAuthorization()});
  }
  delArchivo(id:any):Observable<any>{
    return this.http.delete(`${serviceEndPoint}/${this.routeArchivo}/`+id,{headers:this.grantAuthorization()});
  }
}
