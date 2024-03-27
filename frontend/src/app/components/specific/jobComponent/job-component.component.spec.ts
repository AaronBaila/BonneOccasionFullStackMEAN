import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobComponentComponent } from './empleo.component';

describe('JobComponentComponent', () => {
  let component: JobComponentComponent;
  let fixture: ComponentFixture<JobComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobComponentComponent]
    });
    fixture = TestBed.createComponent(JobComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
