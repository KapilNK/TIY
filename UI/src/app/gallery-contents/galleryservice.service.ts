import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gallerymodel } from './gallerymodel';
import { environment } from '../../environments/environment';

@Injectable()
export class GalleryserviceService {

  constructor(private _http: HttpClient) { }

  getGalleryContents() {
    return this._http.get<any>(environment.gallerycontent);
  }

}
