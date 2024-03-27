import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetannouncesComponent } from './getannounces.component';

describe('GetannouncesComponent', () => {
  let component: GetannouncesComponent;
  let fixture: ComponentFixture<GetannouncesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetannouncesComponent]
    });
    fixture = TestBed.createComponent(GetannouncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
