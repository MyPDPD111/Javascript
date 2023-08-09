import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {

  constructor(private http: HttpClient) {}

  getTask(searchParams: String = ''): Observable<any> {
    return this.http.get<any>(`${environment.taskApiUrl}${searchParams}`);
  }


  getOneTask(id: String): Observable<any> {
    return this.http.get<any>(`${environment.taskApiUrl}${id}`);
  }

  postTask(data: any): Observable<any> {
    return this.http.post<any>(`${environment.taskApiUrl}`, data);
  }

  putTask(id: String, data: any): Observable<any> {
    return this.http.put<any>(`${environment.taskApiUrl}${id}`, data);
  }

  deleteTask(id: String): Observable<any> {
    return this.http.delete<any>(`${environment.taskApiUrl}${id}`);
  }

  updateStatus(id: String, data: any): Observable<any> {
    return this.http.patch<any>(`${environment.taskApiUrl}${id}`, data);
  }
}
