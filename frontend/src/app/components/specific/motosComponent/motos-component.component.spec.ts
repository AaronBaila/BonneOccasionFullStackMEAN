import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotosComponentComponent } from './motos.component';

describe('MotosComponentComponent', () => {
  let component: MotosComponentComponent;
  let fixture: ComponentFixture<MotosComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MotosComponentComponent]
    });
    fixture = TestBed.createComponent(MotosComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
