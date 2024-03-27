import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenComponentComponent } from './children.component';

describe('ChildrenComponentComponent', () => {
  let component: ChildrenComponentComponent;
  let fixture: ComponentFixture<ChildrenComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildrenComponentComponent]
    });
    fixture = TestBed.createComponent(ChildrenComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
