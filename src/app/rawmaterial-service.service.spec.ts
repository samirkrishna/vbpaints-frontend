import { TestBed } from '@angular/core/testing';

import { RawmaterialServiceService } from './rawmaterial-service.service';

describe('RawmaterialServiceService', () => {
  let service: RawmaterialServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RawmaterialServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
