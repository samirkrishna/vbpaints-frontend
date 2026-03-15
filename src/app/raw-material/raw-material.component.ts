import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RawMaterialService } from '../rawmaterial-service.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../toast.service';
import { MaterialCategoryService } from '../material-service.service';
import { MaterialCategory } from '../model/material-category.model';

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

  categories: MaterialCategory[] = [];
  units = ['KG', 'LITERS', 'GRAMS'];

  constructor(
    private fb: FormBuilder,
    private rawMaterialService: RawMaterialService,
    private categoryService: MaterialCategoryService,
    private toast: ToastService
  ) {
    this.rawMaterialForm = this.fb.group({
      name: ['', Validators.required],
      category: [null, Validators.required],
      unitOfMeasure: [this.units[0], Validators.required],
      minimumStockLevel: [null, [Validators.required, Validators.min(0)]],
      description: ['']
    });
    this.loadCategories();
  }

  submit(): void {
    if (this.rawMaterialForm.invalid) {
      this.rawMaterialForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const formValue = this.rawMaterialForm.value;
    const payload = {
      ...formValue,
      category: formValue.category?.name
    };

    this.rawMaterialService.createRawMaterial(payload)
      .subscribe({
        next: () => {
          this.toast.success('Raw material created successfully');
          this.rawMaterialForm.reset();
          this.isSubmitting = false;
        },
        error: (err:any) => {
          this.toast.error(err?.error?.message || 'Failed to save raw material');
          this.isSubmitting = false;
        }
      });
  }

loadCategories() {
  this.categoryService.getAll()
    .subscribe({
      next: (data) => {
        this.categories = data;

        if (this.categories.length > 0) {
          this.rawMaterialForm.patchValue({
            category: this.categories[0]
          });
        }
      },
      error: () => {
        this.toast.error('Failed to load categories');
      }
    });
}

  cancel(): void {
    this.rawMaterialForm.reset();
  }
}
