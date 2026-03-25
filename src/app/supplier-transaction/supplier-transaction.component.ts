import { Component, OnInit } from '@angular/core';
import { SupplierTransactionItem } from "../model/supplier-transaction.model";
import { ActivatedRoute } from "@angular/router";
import { VendorService } from "../vendor.service";
import { DecimalPipe } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaintFormulaService } from "../paint-formula.service";
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-supplier-transaction',
  standalone: true,
  imports: [DecimalPipe, FormsModule, CommonModule],
  templateUrl: './supplier-transaction.component.html',
  styleUrl: './supplier-transaction.component.css'
})
export class SupplierTransactionComponent implements OnInit {

  vendorId: number = 0;
  vendors: any[] = [];
  vehicleType = '';
  vehicleNumber = '';
  paints: any[] = [];

  materialStatus: any[] = [];
  isValidated = false;

  transactionDate: string = '';

  items: SupplierTransactionItem[] = [
    { paintId: 0, paintName: '', containerSize: 5, quantity: 1, pricePerUnit: 0 }
  ];

  constructor(
    private route: ActivatedRoute,
    private service: VendorService,
    private paintService: PaintFormulaService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.transactionDate = new Date().toISOString().substring(0, 10); 
    this.route.params.subscribe(params => {
      if (params['vendorId']) {
        this.vendorId = +params['vendorId'];
      }
    });

    this.loadVendors();
    this.loadPaintNames();
  }

  loadVendors() {
    this.service.getAll().subscribe({
      next: (vendors: any[]) => {
        this.vendors = vendors;
        if (this.vendors.length > 0 && !this.vendorId) {
          this.vendorId = this.vendors[0].id;
        }
      }
    });
  }

  loadPaintNames() {
    this.paintService.getAll().subscribe({
      next: (paints: any[]) => this.paints = paints
    });
  }

  addRow() {
    this.items.push({
      paintId: 0,
      paintName: '',
      containerSize: 5,
      quantity: 1,
      pricePerUnit: 0
    });
    this.resetValidation();
  }

  removeRow(index: number) {
    if (this.items.length > 1) {
      this.items.splice(index, 1);
      this.resetValidation();
    }
  }

  onPaintChange(item: SupplierTransactionItem) {
    const selected = this.paints.find(p => p.id === item.paintId);
    if (selected) {
      item.paintName = selected.paintName;
    }
    this.resetValidation();
  }

  rowTotal(item: SupplierTransactionItem): number {
    return  item.quantity * item.pricePerUnit;
  }

  grandTotal(): number {
    return this.items.reduce((sum, item) => sum + this.rowTotal(item), 0);
  }

  resetValidation() {
    this.isValidated = false;
    this.materialStatus = [];
  }

  validateStock() {

  const request = {
    items: this.items
      .filter(item => item.paintId && item.quantity > 0)
      .map(item => ({
        paintId: item.paintId!,
        containerSize: item.containerSize,
        quantity: item.quantity
      }))
  };

  if (request.items.length === 0) {
    this.toast.error('Add valid items before validation.');
    return;
  }

  this.paintService.validateStock(request).subscribe({
    next: (response) => {

      this.isValidated = response.allAvailable;

      // Map row status back to UI
      response.rows.forEach(status => {
        const row = this.items.find(i =>
          i.paintId === status.paintId &&
          i.containerSize === status.containerSize
        );

        if (row) {
          (row as any).availableQty = status.availableQty;
          (row as any).available = status.available;
        }
      });

      if (response.allAvailable) {
        this.toast.success('Stock validated successfully.');
      } else {
        this.toast.error('Some items have insufficient stock.');
      }
    },
    error: () => {
      this.toast.error('Stock validation failed.');
    }
  });
}


  canSubmit(): boolean {
    return !!(
      this.vendorId > 0 &&
      this.vehicleType &&
      this.vehicleNumber &&
      this.transactionDate &&
      this.items.some(item =>
        item.paintId &&
        item.quantity > 0 &&
        item.pricePerUnit > 0
      ) &&
      this.isValidated
    );
  }

  submit() {

    if (!this.canSubmit()) {
      this.toast.error('Please validate stock before submitting.');
      return;
    }

    const payload = {
      vendorId: this.vendorId,
      vehicleType: this.vehicleType,
      vehicleNumber: this.vehicleNumber,
      transactionDate: this.transactionDate,
      items: this.items
    };

    this.service.createSupplier(payload)
      .subscribe({
        next: () => {
          this.toast.success('Transaction saved successfully!');
          this.resetForm();
        },
        error: () => {
          this.toast.error('Error saving transaction.');
        }
      });
  }

  resetForm() {
    this.items = [
      { paintId: 0, paintName: '', containerSize: 5, quantity: 1, pricePerUnit: 0 }
    ];
    this.vehicleType = '';
    this.vehicleNumber = '';
    this.isValidated = false;
    this.transactionDate = new Date().toISOString().substring(0, 10); 
    this.materialStatus = [];
  }
}
