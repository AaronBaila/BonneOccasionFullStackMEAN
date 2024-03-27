import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionComponentComponent } from './construccion.component';

describe('ConstructionComponentComponent', () => {
  let component: ConstructionComponentComponent;
  let fixture: ComponentFixture<ConstructionComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConstructionComponentComponent]
    });
    fixture = TestBed.createComponent(ConstructionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
