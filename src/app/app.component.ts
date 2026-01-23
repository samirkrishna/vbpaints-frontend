import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { GlobalLoadingComponent } from './global-loading/global-loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent,RouterOutlet,GlobalLoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'vbpaints-frontend';
}
