import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvaudiophotoComponentComponent } from './tvaudiofoto.component';

describe('TvaudiophotoComponentComponent', () => {
  let component: TvaudiophotoComponentComponent;
  let fixture: ComponentFixture<TvaudiophotoComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TvaudiophotoComponentComponent]
    });
    fixture = TestBed.createComponent(TvaudiophotoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
