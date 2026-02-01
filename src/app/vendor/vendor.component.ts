import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {VendorService} from "../vendor.service";
import {Vendor} from "../model/vendor.model";

@Component({
  selector: 'app-vendors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.css'
})
export class VendorComponent implements OnInit {

  vendors: Vendor[] = [];
  loading = false;
  errorMsg = '';

  newVendor: Vendor = {
    name: '',
    contactNo: '',
    address: ''
  };

  constructor(private vendorService: VendorService) {}

  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors(): void {
    this.loading = true;
    this.vendorService.getAll().subscribe({
      next: data => {
        this.vendors = data;
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Failed to load vendors';
        this.loading = false;
      }
    });
  }

  addVendor(): void {
    if (!this.newVendor.name || !this.newVendor.contactNo || !this.newVendor.address) {
      alert('All fields are required');
      return;
    }

    this.vendorService.create(this.newVendor).subscribe({
      next: vendor => {
        this.vendors.push(vendor);
        this.newVendor = { name: '', contactNo: '', address: '' };
      },
      error: () => alert('Failed to add vendor')
    });
  }

  enableEdit(vendor: Vendor): void {
    vendor.isEdit = true;
  }

  saveVendor(vendor: Vendor): void {
    this.vendorService.update(vendor.id!, vendor).subscribe({
      next: () => {
        vendor.isEdit = false;
      },
      error: () => alert('Failed to update vendor')
    });
  }

  deleteVendor(id: number): void {
    if (!confirm('Delete this vendor?')) return;

    this.vendorService.delete(id).subscribe({
      next: () => {
        this.vendors = this.vendors.filter(v => v.id !== id);
      },
      error: () => alert('Failed to delete vendor')
    });
  }

  sortColumn: keyof Vendor | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  sortBy(column: keyof Vendor): void {
    if (this.sortColumn === column) {
      // toggle direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.vendors.sort((a: any, b: any) => {
      const valueA = a[column]?.toString().toLowerCase() ?? '';
      const valueB = b[column]?.toString().toLowerCase() ?? '';

      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  getSortIcon(column: keyof Vendor): string {
    if (this.sortColumn !== column) {
      return '⇅';
    }
    return this.sortDirection === 'asc' ? '▲' : '▼';
  }

}
