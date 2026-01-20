import { Component } from '@angular/core';
import {RawMaterialInventoryService} from "../rawmaterial-inventory-service.service";
import {DashboardKpi} from "../model/dashboard-kpi.model";
import {RawMaterialPurchaseResponse} from "../model/raw-material-purchase.model";
import {Router} from "@angular/router";
import {CommonModule, DatePipe} from "@angular/common";

@Component({
  selector: 'app-overview-dashboard',
  standalone: true,
  imports: [
    DatePipe, CommonModule
  ],
  templateUrl: './overview-dashboard.component.html',
  styleUrl: './overview-dashboard.component.css'
})
export class OverviewDashboardComponent {
  kpis!: DashboardKpi;
  recentPurchases: RawMaterialPurchaseResponse[] = [];

  loading = true;

  constructor(private service: RawMaterialInventoryService, private router: Router) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  private loadDashboard(): void {
    this.service.getKpis().subscribe(kpis => this.kpis = kpis);
    this.service.getAllPurchaseHistory().subscribe(data => this.recentPurchases = data);
  }

  viewAllPurchases(): void {
    this.router.navigate([
      '/inventory'
    ]);
  }
}

