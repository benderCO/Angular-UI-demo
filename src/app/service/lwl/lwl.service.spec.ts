import { TestBed } from '@angular/core/testing';

import { LwlService } from './lwl.service';

describe('LwlService', () => {
  let service: LwlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LwlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
