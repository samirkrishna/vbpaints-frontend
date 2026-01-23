import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintBatchManufacturedComponent } from './paint-batch-manufactured.component';

describe('PaintBatchManufacturedComponent', () => {
  let component: PaintBatchManufacturedComponent;
  let fixture: ComponentFixture<PaintBatchManufacturedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaintBatchManufacturedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaintBatchManufacturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
