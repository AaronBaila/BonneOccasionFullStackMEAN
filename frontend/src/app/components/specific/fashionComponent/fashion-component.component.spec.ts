import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionComponentComponent } from './moda.component';

describe('FashionComponentComponent', () => {
  let component: FashionComponentComponent;
  let fixture: ComponentFixture<FashionComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FashionComponentComponent]
    });
    fixture = TestBed.createComponent(FashionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
