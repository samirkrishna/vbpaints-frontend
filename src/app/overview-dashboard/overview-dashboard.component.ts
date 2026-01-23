import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs';

import { RawMaterialInventoryService } from "../rawmaterial-inventory-service.service";
import { DashboardKpi } from "../model/dashboard-kpi.model";
import { RawMaterialPurchaseResponse } from "../model/raw-material-purchase.model";
import {PaintFormulaService} from "../paint-formula.service";
import {PaintBatch} from "../model/paint-batch.model";

@Component({
  selector: 'app-overview-dashboard',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './overview-dashboard.component.html',
  styleUrl: './overview-dashboard.component.css'
})
export class OverviewDashboardComponent implements OnInit {

  kpis!: DashboardKpi;
  recentPurchases: RawMaterialPurchaseResponse[] = [];
  loading = true;
  manufacturedBatches: PaintBatch[] = [];

  constructor(
    private service: RawMaterialInventoryService,
    private router: Router,
    private paintService: PaintFormulaService
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  private loadDashboard(): void {
    forkJoin({
      kpis: this.service.getKpis(),
      purchases: this.service.getAllPurchaseHistory(),
      manufacture: this.paintService.getManufacturedBatches()
    }).subscribe({
      next: (res) => {
        this.kpis = res.kpis;
        this.recentPurchases = res.purchases;
        this.recentPurchases = res.purchases.slice(0, 5);
        this.manufacturedBatches = res.manufacture;
        this.manufacturedBatches = res.manufacture.slice(0,5);
        this.loading = false;
      },
      error: (err) => {
        console.error('Dashboard load failed', err);
        this.loading = false;
      }
    });
  }

  viewAllPurchases(): void {
    this.router.navigate(['/inventory']);
  }

  viewAllManufacturedBatches(): void {
    this.router.navigate(['/paintmanufactured'])
  }
}
