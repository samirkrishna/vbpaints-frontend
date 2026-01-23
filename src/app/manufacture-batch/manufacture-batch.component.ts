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

  constructor(
    private fb: FormBuilder,
    private service: ManufactureBatchService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      paintFormulaId: ['', Validators.required],
      batchNumber: [{ value: '', disabled: true }],
      batchSize: [null, Validators.required],
      batchUnit: ['', Validators.required],
      manufacturingDate: [null, Validators.required],
      supervisorName: ['', Validators.required]
    });
    this.loadPaintFormulas();
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
      error: () => alert('Failed to load paint formulas')
    });
  }

  onPaintChange(): void {
    const formulaId = this.form.get('paintFormulaId')?.value;

    const selectedFormula = this.paintFormulas.find(
       f => f.id == formulaId
    );

    this.form.patchValue({batchSize: selectedFormula?.batchSize || null,batchUnit: selectedFormula?.batchUnit || null});

    const batchSize = this.form.get('batchSize')?.value;

    if (!formulaId || !batchSize) return;

    this.generateBatchNumber();

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


  generateBatchNumber(): void {
    const num = Math.floor(1000 + Math.random() * 9000);
    this.form.patchValue({
      batchNumber: `BATCH-${num}`
    });
  }

  manufacture(): void {
    //if (this.form.invalid || !this.canManufacture) return;
    console.log("sam")
    const payload = {
      ...this.form.getRawValue()
    };

    this.service.manufacture(payload).subscribe({
      next: () => {
        alert('Batch manufactured successfully');
        this.form.reset();
        this.materialStatus = [];
        this.canManufacture = false;
        this.loadPaintFormulas();
      },
      error: err => {
        alert(err?.error?.message || 'Manufacturing failed');
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
    alert('Batch manufactured successfully');
    this.showConfirmation = false;
    this.form.reset();
    this.materialStatus = [];
    this.canManufacture = false;
  });
}

}
