import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputingelectronicsComponentComponent } from './informaticaelect.component';

describe('ComputingelectronicsComponentComponent', () => {
  let component: ComputingelectronicsComponentComponent;
  let fixture: ComponentFixture<ComputingelectronicsComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComputingelectronicsComponentComponent]
    });
    fixture = TestBed.createComponent(ComputingelectronicsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
