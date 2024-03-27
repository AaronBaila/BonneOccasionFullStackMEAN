import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetannounceComponent } from './getannounce.component';

describe('GetannounceComponent', () => {
  let component: GetannounceComponent;
  let fixture: ComponentFixture<GetannounceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetannounceComponent]
    });
    fixture = TestBed.createComponent(GetannounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
