import { TestBed } from '@angular/core/testing';

import { ComponentservicesService } from './componentservices.service';

describe('ComponentservicesService', () => {
  let service: ComponentservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
