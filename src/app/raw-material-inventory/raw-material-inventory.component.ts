import { Component } from '@angular/core';
import {RawMaterialStockViewModel} from "../model/raw-material-stock-view.model";
import {CommonModule, NgClass} from "@angular/common";
import {RawMaterialInventoryService} from "../rawmaterial-inventory-service.service";
import {HttpClientModule} from "@angular/common/http";
import { MatDialog } from '@angular/material/dialog';
import {
  RawmaterialAddPurchasePopupComponent
} from "../rawmaterial-add-purchase-popup/rawmaterial-add-purchase-popup.component";
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-raw-material-inventory',
  standalone: true,
  imports: [
    NgClass
    ,HttpClientModule,CommonModule, RouterModule
  ],
  templateUrl: './raw-material-inventory.component.html',
  styleUrl: './raw-material-inventory.component.css'
})
export class RawMaterialInventoryComponent {
  rawMaterials: RawMaterialStockViewModel[] = [];
  loading = false;
  errorMsg = '';

  constructor(
    private inventoryService: RawMaterialInventoryService, private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStockView();
  }

  loadStockView(): void {
    this.loading = true;

    this.inventoryService.getStockView().subscribe({
      next: (data) => {
        this.rawMaterials = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'Failed to load inventory data';
        this.loading = false;
      }
    });
  }

  getStatus(material: RawMaterialStockViewModel): 'IN' | 'LOW' {
    if (
      material.minStockLevel !== null &&
      material.availableQty <= material.minStockLevel
    ) {
      return 'LOW';
    }
    return 'IN';
  }

  // addPurchase(): void {
  //   console.log('Add Purchase clicked');
  // }

  addPurchase(materialName?: string) {
    const dialogRef = this.dialog.open(RawmaterialAddPurchasePopupComponent, {
      width: '700px',
      data: { materialName }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result) {
        this.loadStockView();
      }
    });
  }

  viewDetails(material: RawMaterialStockViewModel): void {
    this.router.navigate([
      '/view-purchase',
      material.materialName
    ]);
  }
}
