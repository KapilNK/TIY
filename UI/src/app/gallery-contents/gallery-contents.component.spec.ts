import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryContentsComponent } from './gallery-contents.component';

describe('GalleryContentsComponent', () => {
  let component: GalleryContentsComponent;
  let fixture: ComponentFixture<GalleryContentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryContentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
