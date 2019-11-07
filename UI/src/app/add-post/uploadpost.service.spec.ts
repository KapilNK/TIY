import { TestBed, inject } from '@angular/core/testing';

import { UploadpostService } from './uploadpost.service';

describe('UploadpostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadpostService]
    });
  });

  it('should be created', inject([UploadpostService], (service: UploadpostService) => {
    expect(service).toBeTruthy();
  }));
});
