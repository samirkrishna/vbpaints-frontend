import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchConfirmationComponent } from './batch-confirmation.component';

describe('BatchConfirmationComponent', () => {
  let component: BatchConfirmationComponent;
  let fixture: ComponentFixture<BatchConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchConfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BatchConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
