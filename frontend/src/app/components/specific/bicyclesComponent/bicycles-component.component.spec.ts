import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BicyclesComponentComponent } from './bicycles-component.component';

describe('BicyclesComponentComponent', () => {
  let component: BicyclesComponentComponent;
  let fixture: ComponentFixture<BicyclesComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BicyclesComponentComponent]
    });
    fixture = TestBed.createComponent(BicyclesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
