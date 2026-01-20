import { Routes } from '@angular/router';
import {
  RawmaterialViewPurchaseHistoryComponent
} from "./rawmaterial-view-purchase-history/rawmaterial-view-purchase-history.component";
import {RawMaterialInventoryComponent} from "./raw-material-inventory/raw-material-inventory.component";
import {RawmaterialTableComponent} from "./rawmaterial-table/rawmaterial-table.component";
import {PaintFormulaComponent} from "./paint-formula/paint-formula.component";
import {OverviewDashboardComponent} from "./overview-dashboard/overview-dashboard.component";

export const routes: Routes = [{
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
  }];
