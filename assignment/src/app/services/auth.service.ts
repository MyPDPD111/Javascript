import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
export class AuthService {
  constructor( private http: HttpClient) { }
  isAuthenticated(){
    let user:any = localStorage.getItem('user');
    if(user){
      user = JSON.parse(user);
    }
    if(user.role === "admin"){
      return true
    }else{
      return false;
    }
  }

  login(data: any){
    return this.http.post<any>(`${environment.loginApiUrl}`, data);
  }

  register(data: any){
    return this.http.post<any>(`${environment.registerApiUrl}`, data);
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token
  }
}