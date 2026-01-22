import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RawMaterial } from '../model/raw-material.model';
import {RawMaterialService} from "../rawmaterial-service.service";


@Component({
  selector: 'app-rawmaterial-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rawmaterial-table.component.html',
  styleUrls: ['./rawmaterial-table.component.css']
})
export class RawmaterialTableComponent implements OnInit {

  rawMaterials: RawMaterial[] = [];
  loading = false;

  constructor(private rawMaterialService: RawMaterialService) {}

  ngOnInit(): void {
    this.loadRawMaterials();
  }

  loadRawMaterials(): void {
    this.loading = true;

    this.rawMaterialService.getRawMaterialNames().subscribe({
      next: data => {
        this.rawMaterials = data;
        this.loading = false;
      },
      error: () => {
        alert('Failed to load raw materials');
        this.loading = false;
      }
    });
  }

  enableEdit(material: RawMaterial): void {
    material.isEdit = true;
  }

  updateMaterial(material: RawMaterial): void {
    const payload = {
      id: material.id,
      name: material.name,
      category: material.category,
      unitOfMeasure: material.unitOfMeasure,
      minimumStockLevel: material.minimumStockLevel,
      description: material.description
    };

    this.rawMaterialService.update(material.id, payload).subscribe({
      next: () => {
        material.isEdit = false;
      },
      error: () => alert('Update failed')
    });
  }

  deleteMaterial(id: number): void {
    if (!confirm('Are you sure you want to delete this material?')) {
      return;
    }

    this.rawMaterialService.delete(id).subscribe({
      next: () => {
        this.rawMaterials =
          this.rawMaterials.filter(m => m.id !== id);
      },
      error: () => alert('Delete failed')
    });
  }
}
