import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawmaterialViewPurchaseHistoryComponent } from './rawmaterial-view-purchase-history.component';

describe('RawmaterialViewPurchaseHistoryComponent', () => {
  let component: RawmaterialViewPurchaseHistoryComponent;
  let fixture: ComponentFixture<RawmaterialViewPurchaseHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RawmaterialViewPurchaseHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RawmaterialViewPurchaseHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
