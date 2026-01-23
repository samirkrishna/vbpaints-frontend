import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  mobileOpen = false;

  toggle(): void {
    this.mobileOpen = !this.mobileOpen;
  }

  close(): void {
    this.mobileOpen = false;
  }
}
