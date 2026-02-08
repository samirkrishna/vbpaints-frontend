import { Component, OnInit } from '@angular/core';
import { SupplierTransactionItem } from "../model/supplier-transaction.model";
import { ActivatedRoute } from "@angular/router";
import { VendorService } from "../vendor.service";
import { DecimalPipe } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {PaintFormulaService} from "../paint-formula.service";

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
  paints: any[] = []

  items: SupplierTransactionItem[] = [
    {paintId:0, paintName: '', containerSize: 5, quantity: 1, pricePerUnit: 0 }
  ];

  constructor(
    private route: ActivatedRoute,
    private service: VendorService,
    private paintService: PaintFormulaService

  ) {}

  ngOnInit() {
    // Get vendorId from route params if available
    this.route.params.subscribe(params => {
      if (params['vendorId']) {
        this.vendorId = +params['vendorId'];
      }
    });

    // Load vendors
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
      },
      error: (error: any) => console.error('Error loading vendors:', error)
    });
  }

  loadPaintNames(){
    this.paintService.getAll().subscribe({
      next:(paints: any[]) => {
        this.paints = paints
      },
      error: (error: any) => console.error('Error loading paints', error)
    })
  }

  addRow() {
    this.items.push({
      paintId: 0,
      paintName: '',
      containerSize: 5,
      quantity: 1,
      pricePerUnit: 0
    });
  }

  removeRow(index: number) {
    if (this.items.length > 1) {
      this.items.splice(index);
    }
  }

  rowTotal(item: SupplierTransactionItem): number {
    return item.containerSize * item.quantity * item.pricePerUnit;
  }

  grandTotal(): number {
    return this.items.reduce((sum, item) => sum + this.rowTotal(item), 0);
  }

  canSubmit(): boolean {
    return !!(this.vendorId > 0 &&
      this.vehicleType &&
      this.vehicleNumber &&
      this.items.some(item => item.paintId && item.quantity > 0 && item.pricePerUnit > 0));
  }

  submit() {
    if (!this.canSubmit()) {
      alert('Please fill all required fields and add at least one valid item.');
      return;
    }

    const payload = {
      vendorId: this.vendorId,
      vehicleType: this.vehicleType,
      vehicleNumber: this.vehicleNumber,
      items: this.items.filter(item => item.paintId && item.quantity > 0)
    };

    this.service.createSupplier(payload)
      .subscribe({
        next: () => {
          alert('Transaction saved successfully!');
          this.resetForm();
        },
        error: (error) => {
          console.error('Error saving transaction:', error);
          alert('Error saving transaction. Please try again.');
        }
      });
  }

  resetForm() {
    this.items = [{ paintName: '', containerSize: 5, quantity: 1, pricePerUnit: 0 }];
    this.vehicleType = '';
    this.vehicleNumber = '';
  }
  onPaintChange(item: SupplierTransactionItem) {
    console.log('Paint changed:', item.paintId);
    const selected = this.paints.find(p => p.id === item.paintId);
    if (selected) {
      item.paintName = selected.paintName;
    }
  }
}
