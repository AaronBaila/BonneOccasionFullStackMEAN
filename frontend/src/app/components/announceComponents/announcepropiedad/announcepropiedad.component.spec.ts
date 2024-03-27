import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncepropiedadComponent } from './announcepropiedad.component';

describe('AnnouncepropiedadComponent', () => {
  let component: AnnouncepropiedadComponent;
  let fixture: ComponentFixture<AnnouncepropiedadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnouncepropiedadComponent]
    });
    fixture = TestBed.createComponent(AnnouncepropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
