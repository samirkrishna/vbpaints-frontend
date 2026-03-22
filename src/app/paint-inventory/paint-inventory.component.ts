import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManufactureBatchService } from '../manufatcure-batch.service';
import { InventoryItem } from '../inventory-item';

@Component({
  selector: 'app-paint-inventory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paint-inventory.component.html',
  styleUrls: ['./paint-inventory.component.css']
})
export class PaintInventoryComponent implements OnInit {

  inventory: any[] = [];
  groupedInventory: any = {};
  loading = false;

  constructor(private service: ManufactureBatchService) {}

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.loading = true;

    this.service.getInventory().subscribe({
      next: (res) => {
        this.inventory = res;
        this.groupInventory();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  groupInventory() {
    this.groupedInventory = {};

    this.inventory.forEach(item => {
      if (!this.groupedInventory[item.paintName]) {
        this.groupedInventory[item.paintName] = [];
      }

      this.groupedInventory[item.paintName].push(item);
    });
  }

  getTotalLiters(items: InventoryItem[]): number {
    return items.reduce((sum, i) => sum + (i.size * i.quantity), 0);
  }
  
  getItems(value: unknown): any[] {
    return value as any[];
  }
}