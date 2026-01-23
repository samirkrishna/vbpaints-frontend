import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-batch-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './batch-confirmation.component.html',
  styleUrls: ['./batch-confirmation.component.css']
})
export class BatchConfirmationComponent {

  @Input() batchInfo!: {
    paintName: string;
    batchNumber: string;
    quantityProduced: string;
  };

  @Input() materials: any[] = [];

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

}
