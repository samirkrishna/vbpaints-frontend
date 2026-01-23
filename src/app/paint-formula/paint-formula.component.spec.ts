import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintFormulaComponent } from './paint-formula.component';

describe('PaintFormulaComponent', () => {
  let component: PaintFormulaComponent;
  let fixture: ComponentFixture<PaintFormulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaintFormulaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaintFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
