import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
    
  }

  getUsers(searchParams: String = ""): Observable<any>{
    return this.http.get<any>(`${environment.userApiUrl}${searchParams}`)
  }

  deleteUser(id: String): Observable<any>{
    return this.http.delete<any>(`${environment.userApiUrl}${id}`)
  }

  updateUser(id: String, data: any): Observable<any>{
    return this.http.put<any>(`${environment.uApiUrl}${id}`, data)
  }

}
