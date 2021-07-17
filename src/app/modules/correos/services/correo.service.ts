import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { serviceEndPoint } from 'src/app/routes/endpoint';
import { AuthService } from '../../login/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  constructor(private http:HttpClient, private router:Router, private authService:AuthService) { }
  private routeEmail = 'correos';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  private grantAuthorization(){
    let t = this.authService.token;
    if(t!=null){
      return this.httpHeaders.append('Authorization','Bearer '+t);
    }
    return this.httpHeaders;
  }
  sendEmail(data:any):Observable<any>{
    return this.http.post(`${serviceEndPoint}/${this.routeEmail}`,data,{headers:this.grantAuthorization()})
  }
}
