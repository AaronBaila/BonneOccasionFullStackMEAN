import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesComponentComponent } from './inmobiliaria.component';

describe('PropertiesComponentComponent', () => {
  let component: PropertiesComponentComponent;
  let fixture: ComponentFixture<PropertiesComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropertiesComponentComponent]
    });
    fixture = TestBed.createComponent(PropertiesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
