import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnounceempleoComponent } from './announceempleo.component';

describe('AnnounceempleoComponent', () => {
  let component: AnnounceempleoComponent;
  let fixture: ComponentFixture<AnnounceempleoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnounceempleoComponent]
    });
    fixture = TestBed.createComponent(AnnounceempleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
