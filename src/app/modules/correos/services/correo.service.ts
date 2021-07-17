import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { serviceEndPoint } from 'src/app/routes/endpoint';

@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  constructor(private http:HttpClient, private router:Router) { }
  private routeEmail = 'correos';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  sendEmail(data:any):Observable<any>{
    return this.http.post(`${serviceEndPoint}/${this.routeEmail}`,data,{headers:this.httpHeaders})
  }
}
