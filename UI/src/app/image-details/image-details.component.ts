import { Component, OnInit } from '@angular/core';
import { ImagedetailsService } from './imagedetails.service';
import { ActivatedRoute } from '@angular/router';
import { ImageDetails } from './image-details';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements OnInit {

  id: String;
  imgDetails: ImageDetails[];

  constructor(private imgDetailsService: ImagedetailsService, private activatedroute: ActivatedRoute) { }

  ngOnInit() {

    this.getImageDetails();
   
  }

  getImageDetails() {

    //TODO need to dynamic add id with imageDetails so same object is not
    // used for other galleries.
    if (!localStorage.getItem('imageDetails')) {
      this.activatedroute.paramMap.subscribe(params => {
        this.id = params.get('id');
      });
      this.imgDetailsService.getImageDetails(this.id)
        .subscribe(
          _imagelist => {
            this.imgDetails = _imagelist;
            localStorage.setItem('imageDetails', JSON.stringify(this.imgDetails));
          });
    } else {
      this.imgDetails = JSON.parse(localStorage.getItem('imageDetails'));
    }

  }

}
