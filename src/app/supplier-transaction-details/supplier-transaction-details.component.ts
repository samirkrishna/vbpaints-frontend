import {Component, OnInit} from '@angular/core';
import {SupplierTransactionRequest} from "../model/supplier-transacation-request.model";
import {VendorService} from "../vendor.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {DatePipe, NgForOf} from "@angular/common";
import { CommonModule } from "@angular/common";
import { EmptyDataComponent } from '../shared/components/empty-data/empty-data.component';

@Component({
  selector: 'app-supplier-transaction-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatePipe,
    NgForOf,
    EmptyDataComponent
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

  view(id: number | undefined) {
    this.router.navigate(['/supplier-transactions', id]);
  }

  loadVendors() {
    this.service.getAll()
      .subscribe(v => this.vendors = v);
  }

selectedTransaction: SupplierTransactionRequest | null = null;
showPopup = false;

openPopup(transaction: SupplierTransactionRequest) {
  this.selectedTransaction = transaction;
  this.showPopup = true;
}

closePopup() {
  this.showPopup = false;
  this.selectedTransaction = null;
}

}
