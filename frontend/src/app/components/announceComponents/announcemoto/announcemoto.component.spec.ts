import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncemotoComponent } from './announcemoto.component';

describe('AnnouncemotoComponent', () => {
  let component: AnnouncemotoComponent;
  let fixture: ComponentFixture<AnnouncemotoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnouncemotoComponent]
    });
    fixture = TestBed.createComponent(AnnouncemotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
