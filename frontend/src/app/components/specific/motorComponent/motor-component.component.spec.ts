import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorComponentComponent } from './motor.component';

describe('MotorComponentComponent', () => {
  let component: MotorComponentComponent;
  let fixture: ComponentFixture<MotorComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MotorComponentComponent]
    });
    fixture = TestBed.createComponent(MotorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
