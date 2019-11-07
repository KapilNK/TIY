import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImageDetails } from './image-details';
import { environment } from '../../environments/environment';

@Injectable()
export class ImagedetailsService {

  constructor(private http: HttpClient) { }

  getImageDetails(id: String) {
    return this.http.get<ImageDetails[]>(environment.imagedetails + '/' + id);
  }

}
