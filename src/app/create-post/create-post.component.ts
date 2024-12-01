import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Article, ArticleService } from '../article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,CommonModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  // quillConfiguration = QuillConfiguration;
  postForm: FormGroup;
  showPreview: boolean = false; // Flag to toggle preview visibility
  previewArticle: Article | null = null;
  previewImageUrl: string | null = null;
  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private router: Router
  ){
  this.postForm = this.fb.group({
    category: ['', Validators.required],
    description: ['', Validators.required],
    thumbnail: ['', Validators.required],
    
  });
  }
  
  selectedImage: File | null = null;
  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImageUrl = e.target.result; // Save image data for preview
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }
  postListing() {
    if (this.postForm.valid) {
      const formData = { ...this.postForm.value };
      const newArticle: Article = {
        ...formData,
        image: this.selectedImage ? this.selectedImage.name : '' // Store image name or path
      };
      if (this.selectedImage) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          localStorage.setItem(newArticle.image, e.target.result); // Save the image data as a base64 string
        };
        reader.readAsDataURL(this.selectedImage); // Read the image as a Data URL
      }
      this.articleService.addArticle(newArticle);
      alert('Listing created successfully!');
      this.router.navigate(['/home']);
      console.log("Preview Article:", this.previewArticle); // Debugging log
    } else {
      console.log("Form is not valid for preview"); // Debugging log
    }
  

  }
  previewPost() {
    console.log('Preview button clicked'); // Debug log
    if (this.postForm.valid) {
      this.previewArticle = { ...this.postForm.value }; // Prepare the preview data
      this.showPreview = true; // Show the preview
    } else {
      console.log('Form is not valid'); // Debug log
    }
  }
  onImageError() {
    console.error("Error loading image:", this.previewArticle?.thumbnail);
}
  closePreview() {
    this.showPreview = false; // Hide the preview
    this.previewArticle = null;
    this.previewImageUrl = null;  // Reset preview article
  }
}
// export const QuillConfiguration = {
//   toolbar: [
//     ['bold', 'italic', 'underline', 'strike'],
//     ['blockquote', 'code-block'],
//     [{ list: 'ordered' }, { list: 'bullet' }],
//     [{ header: [1, 2, 3, 4, 5, 6, false] }],
//     [{ color: [] }, { background: [] }, { align: [] }, { font: [] }],
//     ['link'],
//     ['image', 'video'],
//     ['clean'],
//   ],
// };

