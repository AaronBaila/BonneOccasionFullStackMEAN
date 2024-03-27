import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemabooksmusicComponentComponent } from './cinelibrosmusica.component';

describe('CinemabooksmusicComponentComponent', () => {
  let component: CinemabooksmusicComponentComponent;
  let fixture: ComponentFixture<CinemabooksmusicComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CinemabooksmusicComponentComponent]
    });
    fixture = TestBed.createComponent(CinemabooksmusicComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
