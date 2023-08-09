import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectApiService {
  constructor(private http: HttpClient) {}

  getProject(searchParams: String = ''): Observable<any> {
    return this.http.get<any>(`${environment.projectApiUrl}${searchParams}`);
  }

  getOneProject(id: String): Observable<any> {
    return this.http.get<any>(`${environment.projectApiUrl}${id}`);
  }

  postProject(data: any): Observable<any> {
    return this.http.post<any>(`${environment.projectApiUrl}`, data);
  }

  putProject(id: String, data: any): Observable<any> {
    return this.http.put<any>(`${environment.projectApiUrl}${id}`, data);
  }

  deleteProject(id: String): Observable<any> {
    return this.http.delete<any>(`${environment.projectApiUrl}${id}`);
  }
}
