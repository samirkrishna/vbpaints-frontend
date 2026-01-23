import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-global-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overlay" *ngIf="loading$ | async">
      <div class="loader-box">
        <div class="spinner"></div>
        <p>Processing, please wait...</p>
      </div>
    </div>
  `,
  styleUrls: ['./global-loading.component.css']
})
export class GlobalLoadingComponent {
  loading$ = this.loading.loading$;
  constructor(private loading: LoadingService) {}
}
