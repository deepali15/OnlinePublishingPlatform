import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm!: FormGroup;

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  // In registration component
  onRegister() {
    if (this.signupForm.valid) {
      const { username, email, password } = this.signupForm.value;

      // const newUser = this.signupForm.value;

      // Get existing users
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      if (existingUsers.some((user: any) => user.username === username)) {
        alert('Username already exists!');
        return;
      }
      // Add new user
      existingUsers.push({ username, email, password });

      // Save back to localStorage
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

      // Navigate to login
      this.router.navigateByUrl('login');
    }
  }
}
