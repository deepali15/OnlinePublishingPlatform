import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    NgFor],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
    notifications = [
      'You have a new message',
      'Your profile was viewed',
      'New comment on your post',
    ];

    constructor(private router: Router) {}

    navigateToProfile() {
        this.router.navigate(['/author-directory']); // Adjust the route as necessary
    }

    logout() {
        // Implement logout logic, e.g., clear user data, navigate to login
        localStorage.removeItem('currentUser ');
        // Optionally redirect to login page
        this.router.navigate(['/login']);
    }
}
