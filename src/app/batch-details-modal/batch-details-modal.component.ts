import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-batch-details-modal',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './batch-details-modal.component.html',
  styleUrl: './batch-details-modal.component.css'
})
export class BatchDetailsModalComponent {

  @Input() batch: any;
  @Output() close = new EventEmitter<void>();
}
