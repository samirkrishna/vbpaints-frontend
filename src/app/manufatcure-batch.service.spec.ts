import { TestBed } from '@angular/core/testing';

import { ManufatcureBatchService } from './manufatcure-batch.service';

describe('ManufatcureBatchService', () => {
  let service: ManufatcureBatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManufatcureBatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
