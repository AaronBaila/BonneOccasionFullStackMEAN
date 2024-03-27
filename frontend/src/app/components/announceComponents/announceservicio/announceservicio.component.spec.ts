import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnounceservicioComponent } from './announceservicio.component';

describe('AnnounceservicioComponent', () => {
  let component: AnnounceservicioComponent;
  let fixture: ComponentFixture<AnnounceservicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnounceservicioComponent]
    });
    fixture = TestBed.createComponent(AnnounceservicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
