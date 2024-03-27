import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncestandardComponent } from './announcestandard.component';

describe('AnnouncestandardComponent', () => {
  let component: AnnouncestandardComponent;
  let fixture: ComponentFixture<AnnouncestandardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnouncestandardComponent]
    });
    fixture = TestBed.createComponent(AnnouncestandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
