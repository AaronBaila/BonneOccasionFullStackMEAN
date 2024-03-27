import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportleisureComponentComponent } from './deporteocio.component';

describe('SportleisureComponentComponent', () => {
  let component: SportleisureComponentComponent;
  let fixture: ComponentFixture<SportleisureComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SportleisureComponentComponent]
    });
    fixture = TestBed.createComponent(SportleisureComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
