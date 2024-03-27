import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolesvideogamesComponentComponent } from './consolesvideogames-component.component';

describe('ConsolesvideogamesComponentComponent', () => {
  let component: ConsolesvideogamesComponentComponent;
  let fixture: ComponentFixture<ConsolesvideogamesComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsolesvideogamesComponentComponent]
    });
    fixture = TestBed.createComponent(ConsolesvideogamesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
