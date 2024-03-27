import { TestBed } from '@angular/core/testing';

import { DeleteservicesService } from './deleteservices.service';

describe('DeleteservicesService', () => {
  let service: DeleteservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
