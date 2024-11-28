import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Author } from '../author-directory/author-directory.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm!: FormGroup;
  authors :Author[] = []; 

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      category: ['', [Validators.required]],
      bio: ['', [Validators.required, Validators.maxLength(250)]],
    });
  }
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  // In registration component
  onRegister() {
    if (this.signupForm.valid) {
      const { username, email, password, category, bio } = this.signupForm.value;

      const existingAuthors = JSON.parse(localStorage.getItem('authors') || '[]');
      if (existingAuthors.some((author: Author) => author.authorName === username)) {
        alert('Username already exists!');
        return;
      }
      const newAuthor: Author = {
        id: existingAuthors.length + 1,
        authorName: username,
        email: email,
        password: password,
        category: category,
        bio: bio,
        image: this.selectedImage ? this.selectedImage.name : '', 
        popularity: 0,
      }
      // Add new user
      existingAuthors.push(newAuthor);

      // Save back to localStorage
      localStorage.setItem('authors', JSON.stringify(existingAuthors));

      // Navigate to login
      this.router.navigateByUrl('login');
    }
  }
  selectedImage: File | null = null;
  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    }
  }
}
