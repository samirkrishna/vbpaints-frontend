import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierTransactionComponent } from './supplier-transaction.component';

describe('SupplierTransactionComponent', () => {
  let component: SupplierTransactionComponent;
  let fixture: ComponentFixture<SupplierTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierTransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupplierTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
