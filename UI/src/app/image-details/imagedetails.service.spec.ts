import { TestBed, inject } from '@angular/core/testing';

import { ImagedetailsService } from './imagedetails.service';

describe('ImagedetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImagedetailsService]
    });
  });

  it('should be created', inject([ImagedetailsService], (service: ImagedetailsService) => {
    expect(service).toBeTruthy();
  }));
});
