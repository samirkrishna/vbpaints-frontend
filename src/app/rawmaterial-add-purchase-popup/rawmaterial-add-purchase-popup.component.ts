import {Component, Inject} from '@angular/core';
import {RawMaterialPurchaseRequest} from "../model/rawmaterial-add-purchase.model";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RawMaterialInventoryService} from "../rawmaterial-inventory-service.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {RawMaterialService} from "../rawmaterial-service.service";

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
  rawMaterials = ['Pigment A', 'Solvent B', 'Resin C'];

  constructor(
    private fb: FormBuilder,
    private service: RawMaterialInventoryService,
    private rawMaterialService: RawMaterialService,
    private dialogRef: MatDialogRef<RawmaterialAddPurchasePopupComponent>, // <-- here
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.purchaseForm = this.fb.group({
      materialName: [data?.materialName || '', Validators.required],
      dateOfPurchase: ['', Validators.required],
      supplierName: ['', Validators.required],
      quantityPurchased: [0, Validators.required],
      unitPrice: [0, Validators.required],
    });
    this.loadRawMaterials();
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

  // ✅ Save and close
  savePurchase() {
    if (this.purchaseForm.invalid) return;

    const formValue = this.purchaseForm.value;

    const payload: RawMaterialPurchaseRequest = {
      ...formValue,
      dateOfPurchase: new Date(formValue.dateOfPurchase).toISOString(), // LocalDateTime compatible
    };

    this.service.addPurchase(payload).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },

      error: (err) => {
        alert('Error saving purchase: ' + err.message);
      },
    });
  }

  // ✅ Cancel button
  cancel() {
    this.dialogRef.close(false); // <-- closes popup and returns 'false'
  }
}
