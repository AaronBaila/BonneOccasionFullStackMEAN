import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersComponentComponent } from './otros.component';

describe('OthersComponentComponent', () => {
  let component: OthersComponentComponent;
  let fixture: ComponentFixture<OthersComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OthersComponentComponent]
    });
    fixture = TestBed.createComponent(OthersComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
