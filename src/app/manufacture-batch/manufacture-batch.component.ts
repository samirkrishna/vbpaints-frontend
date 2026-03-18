import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ManufactureBatchService } from '../manufatcure-batch.service';
import { BatchConfirmationComponent } from '../batch-confirmation/batch-confirmation.component';
import { FormArray } from '@angular/forms';
import { ToastService } from '../toast.service';


@Component({
  selector: 'app-manufacture-batch',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BatchConfirmationComponent],
  templateUrl: './manufacture-batch.component.html',
  styleUrls: ['./manufacture-batch.component.css']
})
export class ManufactureBatchComponent implements OnInit {

  form!: FormGroup;

   /** 🔹 Loaded from backend */
  paintFormulas: any[] = [];

  materialStatus: any[] = [];
  canManufacture = false;

  showConfirmation = false;

  batchInfo: any = {};

  readonly LITERS_PER_BATCH = 450;


  constructor(
    private fb: FormBuilder,
    private service: ManufactureBatchService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      paintFormulaId: ['', Validators.required],
      batchNumber: ['', Validators.required],
      batchSize: [null, Validators.required],
      manufacturingDate: [null, Validators.required],
      supervisorName: ['', Validators.required],

      packs: this.fb.array([])
    });
    this.addPack();   // 👈 THIS is what you're missing

    this.loadPaintFormulas();

      this.form.get('batchSize')?.valueChanges.subscribe(() => {
        this.validate();
      });
  }

  /** 🔹 Fetch paints dynamically */
  loadPaintFormulas(): void {
    this.service.getPaintFormulas().subscribe({
      next: (res) => {
        const payload = res as any;
        const formulas:any[] =  Array.isArray(payload) ? payload : (payload.items ?? []);
        this.paintFormulas = formulas.filter(f => f.active);
        this.materialStatus = [];
      },
      error: () => this.toast.error('Failed to load paint formulas')
    });
  }

onPaintChange(): void {
  const formulaId = this.form.get('paintFormulaId')?.value;
  const batchSize = this.form.get('batchSize')?.value;

  if (!formulaId || !batchSize) return;

  this.validate();
}


  validate(): void {
    const formulaId = this.form.get('paintFormulaId')?.value;
    const batchSize = this.form.get('batchSize')?.value;

    if (!formulaId || !batchSize) {
      this.materialStatus = [];
      this.canManufacture = false;
      return;
    }

    this.service.validateMaterials(formulaId, batchSize)
      .subscribe(res => {
        this.materialStatus = res;
        this.canManufacture = res.every(r => r.sufficient);
      });
  }


//   generateBatchNumber(): void {
//     const num = Math.floor(1000 + Math.random() * 9000);
//     this.form.patchValue({
//       batchNumber: `BATCH-${num}`
//     });
//   }

  manufacture(): void {
    //if (this.form.invalid || !this.canManufacture) return;
    const payload = {
      ...this.form.getRawValue()
    };

    this.service.manufacture(payload).subscribe({
      next: () => {
        this.toast.success('Batch manufactured successfully');

        // 1️⃣ Reset entire form
        this.form.reset();

        // 2️⃣ Clear material status
        this.materialStatus = [];
        this.canManufacture = false;

        // 3️⃣ CLEAR packs properly
        this.packs.clear();

        // 4️⃣ Add ONE fresh empty row
        this.addPack();

        this.loadPaintFormulas();
      },
      error: err => {
        this.toast.error(err?.error?.message || 'Manufacturing failed');
      }
    });
  }

  cancel(): void {
    this.form.reset();
    this.materialStatus = [];
    this.canManufacture = false;
  }

openConfirmation(): void {
  this.batchInfo = {
    paintName: this.paintFormulas.find(
      p => p.id == this.form.get('paintFormulaId')?.value
    )?.paintName,
    batchNumber: this.form.get('batchNumber')?.value,
    quantityProduced: `${this.form.get('batchSize')?.value} ${this.form.get('batchUnit')?.value}`
  };

  this.showConfirmation = true;
}

confirmBatch(): void {
  const payload = this.form.getRawValue();

  this.service.manufacture(payload).subscribe(() => {
    this.toast.success('Batch manufactured successfully');
    this.showConfirmation = false;
    this.form.reset();
    this.materialStatus = [];
    this.canManufacture = false;
  });
}

get packs(): FormArray {
  return this.form.get('packs') as FormArray;
}

addPack(): void {
  this.packs.push(
    this.fb.group({
      size: [1, Validators.required],
      count: [1, [Validators.required, Validators.min(1)]]
    })
  );
}

removePack(index: number): void {
  if (this.packs.length > 1) {
    this.packs.removeAt(index);
  }
}

get totalPackedLiters(): number {
  return this.packs.controls.reduce((total, group) => {
    const size = group.get('size')?.value || 0;
    const count = group.get('count')?.value || 0;
    return total + (size * count);
  }, 0);
}

get remainingLiters(): number {
  const batchSize = this.form.get('batchSize')?.value || 0;
  const totalLiters = batchSize * 450; 
  return totalLiters - this.totalPackedLiters;
}


isPackingValid(): boolean {
  const batchSize = this.form.get('batchSize')?.value || 0;
  const totalLiters = batchSize * this.LITERS_PER_BATCH;

  return this.totalPackedLiters <= totalLiters;
}

get isManufactureDisabled(): boolean {
  this.logInvalidControls();
  this.logAllErrors(this.form);

  if (this.form.invalid) return true;
  console.log("Form is valid");

  if (!this.canManufacture) return true; // raw material validation

  console.log("Raw materials are sufficient");

  if (this.packs.length === 0) return true;

  console.log("At least one pack added");

  const batchSize = this.form.get('batchSize')?.value || 0;
  const totalLiters = batchSize * this.LITERS_PER_BATCH;

  if (this.getTotalPacked() !== totalLiters) return true;

  console.log("Total packed liters matches batch size");

  console.log("Manufacture button enabled");

  return false;
}

logInvalidControls() {
  Object.keys(this.form.controls).forEach(key => {
    const control = this.form.get(key);

    if (control && control.invalid) {
      console.log('Invalid field:', key, control.errors);
    }
  });
}

logAllErrors(form: any, path: string = '') {
  Object.keys(form.controls).forEach(key => {
    const control = form.get(key);
    const currentPath = path ? `${path}.${key}` : key;

    if (control.errors) {
      console.log(currentPath, control.errors);
    }

    if (control.controls) {
      this.logAllErrors(control, currentPath);
    }
  });
}

getTotalPacked(): number {
  return this.packs.controls.reduce((total, group) => {
    const size = group.get('size')?.value || 0;
    const count = group.get('count')?.value || 0;
    return total + (size * count);
  }, 0);
}



}
