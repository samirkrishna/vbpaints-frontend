import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RawMaterialService } from '../rawmaterial-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-raw-material',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule,CommonModule],
  templateUrl: './raw-material.component.html',
  styleUrl: './raw-material.component.css'
})
export class RawMaterialComponent {
rawMaterialForm: FormGroup;
  isSubmitting = false;

  categories = ['Pigment', 'Solvent', 'Resin', 'Additive'];
  units = ['KG', 'LITERS', 'GRAMS'];

  constructor(
    private fb: FormBuilder,
    private rawMaterialService: RawMaterialService
  ) {
    this.rawMaterialForm = this.fb.group({
      name: ['', Validators.required],
      category: [this.categories[0], Validators.required],
      unitOfMeasure: [this.units[0], Validators.required],
      minimumStockLevel: [null, [Validators.required, Validators.min(0)]],
      description: ['']
    });
  }

  submit(): void {
    if (this.rawMaterialForm.invalid) {
      this.rawMaterialForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    this.rawMaterialService.createRawMaterial(this.rawMaterialForm.value)
      .subscribe({
        next: () => {
          alert('Raw material created successfully');
          this.rawMaterialForm.reset();
          this.isSubmitting = false;
        },
        error: (err:any) => {
          alert(err?.error?.message || 'Failed to save raw material');
          this.isSubmitting = false;
        }
      });
  }

  cancel(): void {
    this.rawMaterialForm.reset();
  }
}
