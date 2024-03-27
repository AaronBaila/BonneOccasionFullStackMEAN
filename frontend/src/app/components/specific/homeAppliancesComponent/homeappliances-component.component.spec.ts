import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeappliancesComponentComponent } from './electrodomesticos.component';

describe('HomeappliancesComponentComponent', () => {
  let component: HomeappliancesComponentComponent;
  let fixture: ComponentFixture<HomeappliancesComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeappliancesComponentComponent]
    });
    fixture = TestBed.createComponent(HomeappliancesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
