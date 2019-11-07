import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import{ Inject, forwardRef } from '@angular/core';

/** Inject With Credentials into the request */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(@Inject(forwardRef(() => CookieService)) private cookieService: CookieService ) { }


  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    
      // console.log("interceptor: " + req.url);
      //console.log("intercept:", req.headers["set-cookie"]);
      //console.log("intercept: setcookie", this.cookieService.getAll());
      
      //console.log("inter req",req.headers);
      req = req.clone({
        withCredentials: true
      });
      
      return next.handle(req);
  }
}