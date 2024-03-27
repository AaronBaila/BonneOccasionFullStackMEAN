import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomegardenComponentComponent } from './hogarjardin.component';

describe('HomegardenComponentComponent', () => {
  let component: HomegardenComponentComponent;
  let fixture: ComponentFixture<HomegardenComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomegardenComponentComponent]
    });
    fixture = TestBed.createComponent(HomegardenComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
