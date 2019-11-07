import { Component, OnInit } from '@angular/core';
import { GalleryserviceService } from './galleryservice.service';
import { Gallerymodel } from './gallerymodel';

@Component({
  selector: 'app-gallery-contents',
  templateUrl: './gallery-contents.component.html',
  styleUrls: ['./gallery-contents.component.css']
})
export class GalleryContentsComponent implements OnInit {

  gallaryContentList: Gallerymodel[];
   //masonryImages;
	limit = 15;

  constructor(private galleryService: GalleryserviceService) { }

  ngOnInit() {
    this.getgalleryList();
    //this.masonryImages = this.gallaryContentList.slice(0, this.limit);
  }

  showMoreImages() {
		this.limit += 15;
	//	this.masonryImages = this.gallaryContentList.slice(0, this.limit);
	}

  getgalleryList() {
    if (!localStorage.getItem('gallerylist')) {
      this.galleryService.getGalleryContents()
        .subscribe(
          _gallerylist => {
            this.gallaryContentList = _gallerylist;
            localStorage.setItem('gallerylist', JSON.stringify(this.gallaryContentList));
          });
    } else {
      this.gallaryContentList = JSON.parse(localStorage.getItem('gallerylist'));
    }
  }

}
