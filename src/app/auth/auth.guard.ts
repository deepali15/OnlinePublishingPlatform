import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    try {
      if (this.authService.isLoggedIn()) {
        return true; // User is logged in, allow access
      }
    } catch (error) {
      console.error('Auth guard error:', error);
    }
    this.router.navigate(['/login']); // Redirect to login page
    return false; // User is not logged in, deny access
  }
}
