import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartphonestelephonyComponentComponent } from './movilestelefonia.component';

describe('SmartphonestelephonyComponentComponent', () => {
  let component: SmartphonestelephonyComponentComponent;
  let fixture: ComponentFixture<SmartphonestelephonyComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmartphonestelephonyComponentComponent]
    });
    fixture = TestBed.createComponent(SmartphonestelephonyComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
