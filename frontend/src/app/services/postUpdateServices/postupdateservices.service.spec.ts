import { TestBed } from '@angular/core/testing';

import { PostupdateservicesService } from './postupdateservices.service';

describe('PostupdateservicesService', () => {
  let service: PostupdateservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostupdateservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
