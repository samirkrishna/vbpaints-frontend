import {Component, Inject, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {RawMaterialPurchaseRequest} from "../model/rawmaterial-add-purchase.model";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RawMaterialInventoryService} from "../rawmaterial-inventory-service.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {RawMaterialService} from "../rawmaterial-service.service";
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-rawmaterial-add-purchase-popup',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule],
  templateUrl: './rawmaterial-add-purchase-popup.component.html',
  styleUrl: './rawmaterial-add-purchase-popup.component.css'
})
export class RawmaterialAddPurchasePopupComponent{
  purchaseForm: FormGroup;
  totalAmount = 0;
  rawMaterials: any[] = [];

  constructor(
    private fb: FormBuilder,
    private service: RawMaterialInventoryService,
    private rawMaterialService: RawMaterialService,
    private toast: ToastService,
    private dialogRef: MatDialogRef<RawmaterialAddPurchasePopupComponent>, // <-- here
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.purchaseForm = this.fb.group({
      materialName: [data?.materialName || '', Validators.required],
      dateOfPurchase: ['', Validators.required],
      supplierName: ['', Validators.required],
      quantityPurchased: [0, Validators.required],
      purchaseLevels: this.fb.array([this.createLevel()])
    });
    this.loadRawMaterials();
    this.purchaseForm.valueChanges.subscribe(() => {
      this.totalAmount = this.calculateGrandTotal();
    });
  }

  loadRawMaterials(): void {
    this.rawMaterialService.getRawMaterialNames()
      .subscribe({
        next: (data) => this.rawMaterials = data.map(m=>m.name),
        error: (err) => console.error('Failed to load raw materials', err)
      });
  }

  calculateTotal() {
    const qty = this.purchaseForm.get('quantityPurchased')?.value || 0;
    const price = this.purchaseForm.get('unitPrice')?.value || 0;
    this.totalAmount = qty * price;
  }

  // // ✅ Save and close
  // savePurchase() {
  //   if (this.purchaseForm.invalid) return;

  //   const formValue = this.purchaseForm.value;

  //   const payload: RawMaterialPurchaseRequest = {
  //     ...formValue,
  //     dateOfPurchase: new Date(formValue.dateOfPurchase).toISOString(), // LocalDateTime compatible
  //   };

  //   this.service.addPurchase(payload).subscribe({
  //     next: () => {
  //       this.dialogRef.close(true);
  //     },

  //     error: (err) => {
  //       alert('Error saving purchase: ' + err.message);
  //     },
  //   });
  // }

  // ✅ Cancel button
  cancel() {
    this.dialogRef.close(false); // <-- closes popup and returns 'false'
  }

  get purchaseLevels() {
  return this.purchaseForm.get('purchaseLevels') as any;
}

createLevel(): FormGroup {
  return this.fb.group({
    packSize: [0, Validators.required],
    unit: ['KG', Validators.required],
    itemCount: [0, Validators.required],
    unitPrice: [0, Validators.required]
  });
}

addLevel() {
  this.purchaseLevels.push(this.createLevel());
  this.purchaseLevels.valueChanges.subscribe(() => {
    this.totalAmount = this.calculateGrandTotal();
  });
}

removeLevel(index: number) {
  if (this.purchaseLevels.length > 1) {
    this.purchaseLevels.removeAt(index);
  }
}

calculateGrandTotal(): number {
  return this.purchaseLevels.controls.reduce((sum: number, ctrl: any) => {
    const level = ctrl.value;
    return sum +
      (level.itemCount || 0) *
      (level.unitPrice || 0);
  }, 0);
}
calculateLevelTotal(index: number): number {
  const level = this.purchaseLevels.at(index).value;

  return (level.itemCount || 0) *
         (level.unitPrice || 0);
}


  savePurchase() {
    if (this.purchaseForm.invalid) return;

    const formValue = this.purchaseForm.value;

    const payload:any = {
      materialName: formValue.materialName,
      supplierName: formValue.supplierName,
      dateOfPurchase: new Date(formValue.dateOfPurchase).toISOString(),
      purchaseLevels: formValue.purchaseLevels,
      unitPrice: formValue.totalAmount / formValue.quantityPurchased // Average unit price across levels,
    };

    this.service.addPurchase(payload).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => this.toast.error('Error saving purchase: ' + err.message)
    });
  }


}
