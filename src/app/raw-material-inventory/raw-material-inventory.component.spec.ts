import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialInventoryComponent } from './raw-material-inventory.component';

describe('RawMaterialInventoryComponent', () => {
  let component: RawMaterialInventoryComponent;
  let fixture: ComponentFixture<RawMaterialInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RawMaterialInventoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RawMaterialInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
