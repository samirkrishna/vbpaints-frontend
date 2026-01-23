import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {PaintFormula} from "../model/paint-formula.model";
import {PaintFormulaService} from "../paint-formula.service";

@Component({
  selector: 'app-paint-formula',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paint-formula.component.html',
  styleUrl: './paint-formula.component.css'
})
export class PaintFormulaComponent implements OnInit{
  formulas: PaintFormula[] = [];
  loading = false;

  constructor(private service: PaintFormulaService) {}

  ngOnInit(): void {
    this.loadFormulas();
  }

  loadFormulas() {
    this.loading = true;
    this.service.getAll().subscribe({
      next: data => {
        this.formulas = data;
        this.loading = false;
      },
      error: () => {
        alert('Failed to load paint formulas');
        this.loading = false;
      }
    });
  }

  onStatusToggle(formula: PaintFormula) {
    this.service.update(formula.id, formula.active).subscribe({
      next: () => {
        this.loadFormulas();
      },
      error: () => {
        alert('Failed to update status');
        formula.active = !formula.active;
      }
    });
  }
}
