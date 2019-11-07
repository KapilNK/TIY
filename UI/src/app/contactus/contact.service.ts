import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class ContactService {

  constructor(private _http:HttpClient) { }

  sendContactInfo(body: any) {
    return this._http.post(environment.contactusurl, body, {
      observe: 'body'
    });
  }
}
