import {Component, OnInit} from '@angular/core';
import {PaintFormulaService} from "../paint-formula.service";
import {PaintBatch} from "../model/paint-batch.model";
import {CommonModule, DatePipe} from "@angular/common";
import { Router } from '@angular/router';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-paint-batch-manufactured',
  standalone: true,
  imports: [
    DatePipe, CommonModule
  ],
  templateUrl: './paint-batch-manufactured.component.html',
  styleUrl: './paint-batch-manufactured.component.css'
})
export class PaintBatchManufacturedComponent implements OnInit{
  batches: PaintBatch[] = [];
  loading = false;
  showModal = false;
  selectedBatch: any;

  constructor(private service: PaintFormulaService,private router: Router,private toastService:ToastService) {}

  ngOnInit(): void {
    this.loadBatches();
  }

  loadBatches() {
    this.service.getManufacturedBatches().subscribe({
      next: data => {
        this.batches = data.sort((a, b) => {
          return new Date(b.manufacturingDate).getTime()
              - new Date(a.manufacturingDate).getTime();
        });
      }
    });
  }

  editBatch(id: number) {
    this.router.navigate(['/edit-batch', id]);
  }

  deleteBatch(id: number) {
    const confirmDelete = confirm('Are you sure you want to delete this batch?');

    if (!confirmDelete) return;

    this.service.deleteBatch(id).subscribe({
      next: () => {
        this.toastService.success('Deleted successfully');        
        this.loadBatches(); // refresh table
      },
      error: () => {
        this.toastService.error('Failed to delete batch');
      }
    });
  }
}
