import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  userForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  constructor(private authService: AuthService, private routerr: Router) { }

  router = inject(Router);

  onLogin() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;

      // Get stored user details from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

      // Find user with matching credentials
      const user = registeredUsers.find((u: any) =>
        u.username === formValue.username &&
        u.password === formValue.password
      );
      if (user) {
        // Store logged in user details
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.authService.login('userToken');
        this.router.navigate(['/home']);

      } else {
        alert('Invalid username or password');
      }
    } else {
      alert('Please fill all required fields');
    }
  }
  toRegister() {
    this.router.navigateByUrl('signup');
  }
}
