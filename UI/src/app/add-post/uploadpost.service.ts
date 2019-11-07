import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class UploadpostService {


  constructor(private _http: HttpClient) { }

  uploadPost(data: FormData) {
    debugger;
    return this._http.post<any>(environment.addPosturl, data);
  }


}
