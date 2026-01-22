import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RawMaterialPurchaseResponse} from "../model/raw-material-purchase.model";
import {ActivatedRoute} from "@angular/router";
import {RawMaterialInventoryService} from "../rawmaterial-inventory-service.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-rawmaterial-view-purchase-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rawmaterial-view-purchase-history.component.html',
  styleUrl: './rawmaterial-view-purchase-history.component.css'
})
export class RawmaterialViewPurchaseHistoryComponent implements OnInit{
  materialName!: string;
  historyList: RawMaterialPurchaseResponse[] = [];
  loading = false;
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private inventoryService: RawMaterialInventoryService
  ) {}

  ngOnInit(): void {
    this.materialName = this.route.snapshot.paramMap.get('materialName')!;
    this.loadPurchaseHistory();
  }

  loadPurchaseHistory(): void {
    this.loading = true;

    this.inventoryService
      .getPurchaseHistory(this.materialName)
      .subscribe({
        next: data => {
          this.historyList = data;
          this.loading = false;
        },
        error: err => {
          console.error(err);
          this.errorMsg = 'Failed to load purchase history';
          this.loading = false;
        }
      });
  }

  deletePurchase(id: number) {
    if (!confirm('Are you sure you want to delete this record?')) {
      return;
    }

    this.inventoryService.deletePurchase(id).subscribe({
      next: () => {
        this.historyList = this.historyList.filter(h => h.id !== id);
      },
      error: () => {
        alert('Failed to delete purchase');
      }
    });
  }

  enableEdit(row: any) {
    row.isEdit = true;
  }

  updatePurchase(row: any) {
    const payload = {
      supplierName: row.supplierName,
      quantityPurchased: row.quantityPurchased,
      unitPrice: row.unitPrice,
      dateOfPurchase: row.dateOfPurchase
    };

    this.inventoryService.updatePurchase(row.id, payload).subscribe({
      next: () => {
        row.isEdit = false;
        this.loadPurchaseHistory(); // reload list
      },
      error: () => {
        alert('Failed to update purchase');
      }
    });
  }

}
