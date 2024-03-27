import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryagricultureComponentComponent } from './industriaagricultura.component';

describe('IndustryagricultureComponentComponent', () => {
  let component: IndustryagricultureComponentComponent;
  let fixture: ComponentFixture<IndustryagricultureComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndustryagricultureComponentComponent]
    });
    fixture = TestBed.createComponent(IndustryagricultureComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
