import {Component, OnInit} from '@angular/core';
import {SupplierTransactionRequest} from "../model/supplier-transacation-request.model";
import {VendorService} from "../vendor.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule, DatePipe} from "@angular/common";

@Component({
  selector: 'app-supplier-transaction-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatePipe
  ],
  templateUrl: './supplier-transaction-details.component.html',
  styleUrl: './supplier-transaction-details.component.css'
})
export class SupplierTransactionDetailsComponent implements OnInit{
  transactions: SupplierTransactionRequest[] = [];
  vendors: any[] = [];

  filters: any = {
    vendorId: '',
    fromDate: '',
    toDate: '',
    paintName: ''
  };

  constructor(
    private service: VendorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
    this.loadVendors();
  }

  load() {
    this.service.getTransactions(this.filters)
      .subscribe(data => this.transactions = data);
  }

  clear() {
    this.filters = {};
    this.load();
  }

  view(id: number|undefined) {
    this.router.navigate(['/supplier-transactions', id]);
  }

  loadVendors() {
    this.service.getAll()
      .subscribe(v => this.vendors = v);
  }
}
