import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgIf, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss',
    '../styles.scss'
  ]
})
export class AppComponent {
  title = 'Join_Frontend';
  showSidebar: boolean = true;

  constructor(private router: Router) {
    // Überprüfen der Route, wann die Sidebar angezeigt oder ausgeblendet werden soll
    this.router.events.subscribe(() => {
      // Liste der Routen, auf denen die Sidebar ausgeblendet werden soll
      const excludedRoutes = ['/', '/login', '/create-account', '/legal-notice', '/privacy-policy']; // Füge die Routen hinzu, auf denen du die Sidebar ausblenden möchtest
      this.showSidebar = !excludedRoutes.includes(this.router.url);
    });
  }
}
