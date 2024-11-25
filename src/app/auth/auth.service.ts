import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root' // This ensures the service is available throughout the app
})
export class AuthService {
  private readonly TOKEN_KEY = 'AuthToken'; // Change this to your actual key
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // Simulate checking if a user is logged in by checking for a token
  isLoggedIn(): boolean {
    if (this.isBrowser) {
      return !!localStorage.getItem(this.TOKEN_KEY);
    }
    return false;
  }

  // Simulate a login method that sets an authentication token
  login(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem(this.TOKEN_KEY, token); // Store token in localStorage (or use a more secure method)
    }
  }

  // Simulate a logout method that removes the authentication token
  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem('currentUser');
    }
  }

  // You can add more authentication-related methods as needed
}
