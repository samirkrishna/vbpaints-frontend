import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchDetailsModalComponent } from './batch-details-modal.component';

describe('BatchDetailsModalComponent', () => {
  let component: BatchDetailsModalComponent;
  let fixture: ComponentFixture<BatchDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchDetailsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BatchDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
