import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ManufactureBatchService } from '../manufatcure-batch.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-container-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './container-inventory.component.html',
  styleUrls: ['./container-inventory.component.css']
})
export class ContainerInventoryComponent implements OnInit {

  containers: any[] = [];

  newContainer = {
    size: null,
    quantity: null
  };

  constructor(
    private service: ManufactureBatchService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loadContainers();
  }

  loadContainers() {
    this.service.getContainers().subscribe(res => {
      this.containers = res;
    });
  }

  addContainer() {
    if (!this.newContainer.size || !this.newContainer.quantity) {
      this.toast.error('Please enter size and quantity');
      return;
    }

    this.service.addContainer(this.newContainer).subscribe({
      next: () => {
        this.toast.success('Container added');
        this.newContainer = { size: null, quantity: null };
        this.loadContainers();
      },
      error: () => this.toast.error('Failed to add container')
    });
  }

  deleteContainer(size: number) {
    if (!confirm('Are you sure you want to delete this container?')) return;

    this.service.deleteContainer(size).subscribe({
      next: () => {
        this.toast.success('Deleted successfully');
        this.loadContainers();
      },
      error: () => this.toast.error('Delete failed')
    });
  }
}