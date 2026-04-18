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
import { ActivatedRoute, Router } from '@angular/router';


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

  isEditMode = false;
  batchId!: number;

  containerStatus: any[] = [];
  containerInventory: any[] = [];


  constructor(
    private fb: FormBuilder,
    private service: ManufactureBatchService,
    private toast: ToastService,
    private route: ActivatedRoute,
    private router: Router
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
    
    this.addPack(); 

    this.loadPaintFormulas();

    this.loadContainers();

   
      // ✅ EDIT MODE DETECTION
    this.route.params.subscribe(params => {
      if (params['id']) {
        console.log('Edit mode detected for batch ID:', params['id']);
        this.isEditMode = true;
        this.batchId = +params['id'];
        this.loadBatchDetails();
      }else{
        this.form.get('batchSize')?.valueChanges.subscribe(() => {
          this.validate();
        });
      }
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

        // ✅ Ensure current formula is included even if inactive
      if (this.isEditMode && this.batchId) {

        this.form.get('paintFormulaId')?.disable();
        this.service.getBatchDetails(this.batchId).subscribe((batch: any) => {
          const exists = this.paintFormulas.some(f => f.id === batch.paintFormulaId);

          if (!exists) {
            const fullList = Array.isArray(payload) ? payload : (payload.items ?? []);
            const selected = fullList.find((f: { id: any; }) => f.id === batch.paintFormulaId);
            if (selected) {
              this.paintFormulas.push(selected);
            }
          }

          this.loadBatchDetails(); // finally load
        });
      }
      },
      error: () => this.toast.error('Failed to load paint formulas')
    });
  }
  

  loadBatchDetails(): void {
  this.service.getBatchDetails(this.batchId).subscribe({
    next: (res: any) => {

      // ✅ Patch basic fields
      this.form.patchValue({
        paintFormulaId: res.paintFormulaId,
        batchNumber: res.batchNumber,
        batchSize: res.batchSize,
        manufacturingDate: res.manufacturingDate,
        supervisorName: res.supervisorName
      });

      // ✅ Handle packs JSON
      const packs = JSON.parse(res.packs || '[]');

      this.packs.clear();

      packs.forEach((p: any) => {
        this.packs.push(this.fb.group({
          size: [p.size, Validators.required],
          count: [p.count, [Validators.required, Validators.min(1)]]
        }));
      });

      this.validate();
    },
    error: () => this.toast.error('Failed to load batch details')
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

        this.validateContainers();
      });
  }


//   generateBatchNumber(): void {
//     const num = Math.floor(1000 + Math.random() * 9000);
//     this.form.patchValue({
//       batchNumber: `BATCH-${num}`
//     });
//   }

 manufacture(): void {
  const payload = {
    ...this.form.getRawValue()
  };

  if (this.isEditMode) {
    this.service.updateBatch(this.batchId, payload).subscribe({
      next: () => {
        this.toast.success('Batch updated successfully');
        this.showConfirmation = false;
        this.router.navigate(['/manufacturing']); // optional redirect
      },
      error: err => {
        this.toast.error(err?.error?.message || 'Update failed');
      }
    });
  } else {
    this.service.manufacture(payload).subscribe({
      next: () => {
        this.toast.success('Batch manufactured successfully');

        this.form.reset();
        this.materialStatus = [];
        this.canManufacture = false;
        this.packs.clear();
        this.addPack();
        this.loadPaintFormulas();

        this.showConfirmation = false;
      },
      error: err => {
        this.toast.error(err?.error?.message || 'Manufacturing failed');
      }
    });
  }
}

  cancel(): void {
    this.form.reset();
    this.materialStatus = [];
    this.canManufacture = false;
  }

openConfirmation(): void {
  const batchSize = this.form.get('batchSize')?.value || 0;
  this.batchInfo = {
    paintName: this.paintFormulas.find(
      p => p.id == this.form.get('paintFormulaId')?.value
    )?.paintName,
    batchNumber: this.form.get('batchNumber')?.value,
    quantityProduced: `${this.totalPackedLiters} liters`,
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
  return batchSize - this.totalPackedLiters;
}


isPackingValid(): boolean {
  const batchSize = this.form.get('batchSize')?.value || 0;
  return this.totalPackedLiters <= batchSize;
}

get isManufactureDisabled(): boolean {

  if (this.form.invalid) return true;

  if (!this.canManufacture) return true; // raw material validation

  if (this.packs.length === 0) return true;

  // const batchSize = this.form.get('batchSize')?.value || 0;
  // if (this.getTotalPacked() != batchSize) return true;

  if (this.containerStatus.some(c => !c.ok)) return true;
  return false;
}

getTotalPacked(): number {
  return this.packs.controls.reduce((total, group) => {
    const size = group.get('size')?.value || 0;
    const count = group.get('count')?.value || 0;
    return total + (size * count);
  }, 0);
}

loadContainers(): void {
  this.service.getContainers().subscribe(res => {
    this.containerInventory = res;
    this.validateContainers(); // Re-validate containers after loading
  });
}

validateContainers(): void {
  this.containerStatus = this.packs.controls.map(pack => {
    const size = pack.get('size')?.value;
    const count = pack.get('count')?.value;

    const container = this.containerInventory.find(c => c.size == size);

    if (!container) {
      return { ok: false, message: 'No data' };
    }

    return {
      ok: container.quantity >= count,
      available: container.quantity,
      required: count
    };
  });
}

hasContainerIssue(): boolean {
  return this.containerStatus?.some(c => !c.ok);
}

}
