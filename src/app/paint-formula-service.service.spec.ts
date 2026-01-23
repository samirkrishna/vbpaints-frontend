import { TestBed } from '@angular/core/testing';

import { PaintFormulaServiceService } from './paint-formula-service.service';

describe('PaintFormulaServiceService', () => {
  let service: PaintFormulaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaintFormulaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
