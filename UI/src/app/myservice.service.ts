import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { User } from './models/user';
import { CookieService } from 'ngx-cookie-service';

//const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8','Access-Control-Allow-Origin':'*'});
///let options = new RequestOptions({ headers: headers, withCredentials: true });
@Injectable()
export class MyserviceService {

  constructor(private _http: HttpClient,
    private cookieService: CookieService) { }

  submitRegister(body: any) {
    return this._http.post(environment.registerurl, body, {
      observe: 'body'
    });
  }

  submitresetp(body: any) {
    return this._http.post(environment.resetpurl, body, {
      observe: 'body'
    });
  }

  login(body: any) {
    return this._http.post<User>(environment.loginurl, body, {
      observe: 'body',
      withCredentials: true
    });
  }

  forgotpassword(body: any) {
    return this._http.post<any>(environment.forgotpassword, body, {
      observe: 'body'
    });
  }

  logout(body: any) {
    //console.log('logoutbody', body);
    let logouturl = environment.logouturl + localStorage.getItem('email');
    //console.log('logouturl', logouturl);
    
    return this._http.post(logouturl,{ email: body }, {
      observe: 'body',
      withCredentials:true
    });
  }

  public isAuthenticated(): boolean {
    if (decodeURIComponent(this.cookieService.get("access_token"))) {
      return true;
    }
    return false;
  }

  // getUserName() {
  //   return this._http.get('http://api.localhost.in:3000/users/username', {
  //     observe: 'body',
  //     params: new HttpParams().append('token', localStorage.getItem('token'))
  //   });
  // }

}
