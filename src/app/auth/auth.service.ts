// src/app/auth/auth.service.ts

import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private readonly TOKEN_KEY = 'AuthToken'; // Change this to your actual key
    private isBrowser: boolean;
  
  // This is a simple example; you might want to implement actual authentication logic
  private loggedIn = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // Simulate a login method
  login(token: string) {
    if (this.isBrowser) {
        localStorage.setItem(this.TOKEN_KEY, token); // Store token in localStorage (or use a more secure method)
      }
    }

  // Simulate a logout method
  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem('currentUser');
    }
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    if (this.isBrowser) {
      return !!localStorage.getItem(this.TOKEN_KEY);
    }
    return false;
  }
}