import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintInventoryComponent } from './paint-inventory.component';

describe('PaintInventoryComponent', () => {
  let component: PaintInventoryComponent;
  let fixture: ComponentFixture<PaintInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaintInventoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaintInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
