// src/app/auth/auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Adjust the path if necessary

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    // Check if the user is logged in
    if (this.authService.isLoggedIn()) {
      return true; // User is authenticated, allow access
    }

    // User is not authenticated, redirect to login
    this.router.navigate(['/login']);
    return false; // Deny access
  }
}