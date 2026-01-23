import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { PaintFormulaService } from '../paint-formula-service.service';

@Component({
  selector: 'app-paint-formula',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './paint-formula-management.component.html',
  styleUrls: ['./paint-formula-management.component.css']
})
export class PaintFormulaManagementComponent {

  formulaForm: FormGroup;

  // These will later come from backend
  rawMaterials = [
    { id: 4, name: 'Pigment A' },
    { id: 5, name: 'Solvent B' },
    { id: 6, name: 'Resin C' }
  ];

  units = ['KG', 'LITERS', 'GRAMS'];

  constructor(
    private fb: FormBuilder,
    private service: PaintFormulaService
  ) {
    this.formulaForm = this.fb.group({
      paintName: ['', Validators.required],
      batchSize: [null, [Validators.required, Validators.min(1)]],
      batchUnit: ['LITERS', Validators.required],
      items: this.fb.array([])
    });

    this.addItem(); // start with one row
  }

  /* ---------- getters ---------- */

  get items(): FormArray {
    return this.formulaForm.get('items') as FormArray;
  }

  /* ---------- row handling ---------- */

  addItem(): void {
    this.items.push(this.fb.group({
      rawMaterialId: [null, Validators.required],
      quantity: [null, [Validators.required, Validators.min(0.01)]],
      unit: ['KG', Validators.required],
      notes: ['']
    }));
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  /* ---------- submit ---------- */

  save(): void {
    if (this.formulaForm.invalid) {
      this.formulaForm.markAllAsTouched();
      return;
    }

    this.service.create(this.formulaForm.value).subscribe({
      next: () => {
        alert('Paint formula saved successfully');
        this.formulaForm.reset();
        this.items.clear();
        this.addItem();
      },
      error: (err) => {
        alert(err?.error?.message || 'Failed to save formula');
      }
    });
  }
}