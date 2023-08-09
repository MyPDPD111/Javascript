import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor( private http: HttpClient) { }
  isAuthenticated(){
    let token = localStorage.getItem('token');
    if(token != undefined && token.length > 0){
      return true;
    }
    return false;
  }

  login(data: any){
    return this.http.post<any>(`${environment.loginApiUrl}`, data);
  }

  register(data: any){
    return this.http.post<any>(`${environment.registerApiUrl}`, data);
  }

  logout(){
    return this.http.get<any>(`${environment.logoutApiUrl}`);
  }

  getUserLocal(){
    return this.http.get<any>(`${environment.userLocal}`);
  }
}
