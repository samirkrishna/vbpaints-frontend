import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintFormulaManagementComponent } from './paint-formula-management.component';

describe('PaintFormulaManagementComponent', () => {
  let component: PaintFormulaManagementComponent;
  let fixture: ComponentFixture<PaintFormulaManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaintFormulaManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaintFormulaManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
