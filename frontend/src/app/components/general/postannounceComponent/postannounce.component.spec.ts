import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostannounceComponent } from './postannounce.component';

describe('PostannounceComponent', () => {
  let component: PostannounceComponent;
  let fixture: ComponentFixture<PostannounceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostannounceComponent]
    });
    fixture = TestBed.createComponent(PostannounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
