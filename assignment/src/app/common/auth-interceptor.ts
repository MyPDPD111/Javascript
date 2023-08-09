import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor} 
     from "@angular/common/http";
import {HttpRequest} from "@angular/common/http";

import { AuthService } from "../services/auth.service";
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor() {
    }

    intercept(req: HttpRequest<any>, 
               next: HttpHandler):Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token')
     
        if(token){
            req = req.clone({
                setHeaders: { "Authorization": `Bearer ${token}` }
            });
        }
        return next.handle(req);
    }
}
  