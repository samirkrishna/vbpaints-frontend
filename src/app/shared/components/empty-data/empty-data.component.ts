import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-empty-data',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './empty-data.component.html',
  styleUrls: ['./empty-data.component.css']
})
export class EmptyDataComponent {

  @Input() title: string = 'No Data Found';

  @Input() description: string = 'There is nothing to display here.';

  @Input() icon: string = 'inbox';

  @Input() buttonText?: string;

  @Output() action = new EventEmitter<void>();

}