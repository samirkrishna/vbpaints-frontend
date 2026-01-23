import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RawMaterialInventoryComponent } from "./raw-material-inventory/raw-material-inventory.component";
import { RawMaterialComponent } from './raw-material/raw-material.component';
import { PaintFormulaComponent } from './paint-formula/paint-formula.component';
import { ManufactureBatchComponent } from './manufacture-batch/manufacture-batch.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RawMaterialInventoryComponent,RawMaterialComponent,PaintFormulaComponent,ManufactureBatchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'vbpaints-frontend';
}
