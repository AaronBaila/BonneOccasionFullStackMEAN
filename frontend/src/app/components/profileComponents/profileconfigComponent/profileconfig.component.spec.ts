import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileconfigComponent } from './profileconfig.component';

describe('ProfileconfigComponent', () => {
  let component: ProfileconfigComponent;
  let fixture: ComponentFixture<ProfileconfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileconfigComponent]
    });
    fixture = TestBed.createComponent(ProfileconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
