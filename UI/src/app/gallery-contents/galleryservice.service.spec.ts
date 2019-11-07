import { TestBed, inject } from '@angular/core/testing';

import { GalleryserviceService } from './galleryservice.service';

describe('GalleryserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GalleryserviceService]
    });
  });

  it('should be created', inject([GalleryserviceService], (service: GalleryserviceService) => {
    expect(service).toBeTruthy();
  }));
});
