import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncevehiculoComponent } from './announcevehiculo.component';

describe('AnnouncevehiculoComponent', () => {
  let component: AnnouncevehiculoComponent;
  let fixture: ComponentFixture<AnnouncevehiculoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnouncevehiculoComponent]
    });
    fixture = TestBed.createComponent(AnnouncevehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
