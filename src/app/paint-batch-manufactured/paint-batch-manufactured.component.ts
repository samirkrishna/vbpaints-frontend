import {Component, OnInit} from '@angular/core';
import {PaintFormulaService} from "../paint-formula.service";
import {PaintBatch} from "../model/paint-batch.model";
import {CommonModule, DatePipe} from "@angular/common";

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

  constructor(private service: PaintFormulaService) {}

  ngOnInit(): void {
    this.loadBatches();
  }

  loadBatches() {
    this.service.getManufacturedBatches().subscribe({
      next: data => this.batches = data
    });
  }

}
