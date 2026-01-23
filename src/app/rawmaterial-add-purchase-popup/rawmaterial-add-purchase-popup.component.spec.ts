import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawmaterialAddPurchasePopupComponent } from './rawmaterial-add-purchase-popup.component';

describe('RawmaterialAddPurchasePopupComponent', () => {
  let component: RawmaterialAddPurchasePopupComponent;
  let fixture: ComponentFixture<RawmaterialAddPurchasePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RawmaterialAddPurchasePopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RawmaterialAddPurchasePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
