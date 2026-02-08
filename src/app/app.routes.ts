import { Routes } from '@angular/router';
import {
  RawmaterialViewPurchaseHistoryComponent
} from "./rawmaterial-view-purchase-history/rawmaterial-view-purchase-history.component";
import {RawMaterialInventoryComponent} from "./raw-material-inventory/raw-material-inventory.component";
import {RawmaterialTableComponent} from "./rawmaterial-table/rawmaterial-table.component";
import {PaintFormulaComponent} from "./paint-formula/paint-formula.component";
import {OverviewDashboardComponent} from "./overview-dashboard/overview-dashboard.component";
import {PaintBatchManufacturedComponent} from "./paint-batch-manufactured/paint-batch-manufactured.component";
import { RawMaterialComponent } from './raw-material/raw-material.component';
import { PaintFormulaManagementComponent } from './paint-formula-management/paint-formula-management.component';
import { ManufactureBatchComponent } from './manufacture-batch/manufacture-batch.component';
import {VendorComponent} from "./vendor/vendor.component";
import {SupplierTransactionComponent} from "./supplier-transaction/supplier-transaction.component";
import {
  SupplierTransactionDetailsComponent
} from "./supplier-transaction-details/supplier-transaction-details.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboardview',
    pathMatch: 'full'
  },
  {
    path: 'view-purchase/:materialName',
    component: RawmaterialViewPurchaseHistoryComponent
  },
  {
    path:'inventory',
    component: RawMaterialInventoryComponent
  },
  {
    path:'rawmaterial',
    component: RawmaterialTableComponent
  },
  {
    path:'paintformula',
    component: PaintFormulaComponent
  },
  {
    path:'dashboardview',
    component: OverviewDashboardComponent
  },
  {
    path:'paintmanufactured',
    component: PaintBatchManufacturedComponent
  },
  {
    path:'addrawmaterial',
    component: RawMaterialComponent
  },
  {
    path:'paintformulamamanagement',
    component: PaintFormulaManagementComponent
  },
  {
    path:'manufacturebatch',
    component: ManufactureBatchComponent
  },
  {
    path:'vendor',
    component: VendorComponent
  },
  {
    path:'supplierTransaction',
    component: SupplierTransactionComponent
  },
  {
  path:'supplierTransactionDetails',
  component: SupplierTransactionDetailsComponent
},

];
