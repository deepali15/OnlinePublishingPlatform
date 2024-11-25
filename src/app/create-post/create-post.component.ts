import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, QuillModule,ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  quillConfiguration = QuillConfiguration;

  @Input() control!: FormControl;

  ngOnInit() {
    this.control = this.control ?? new FormControl();
  }
  // saveDraft() {
  //   const draft = this.editorForm.value;
  //   console.log('Post saved as draft:', draft);
  //   // Logic for saving drafts can go here
  // }

  // submitArticle() {
  //   if (this.editorForm.valid) {
  //     console.log('Article Submitted:', this.editorForm.value);
  //     // Publish logic here
  //   }
  // }
}
export const QuillConfiguration = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }, { align: [] }, { font: [] }],
    ['link'],
    ['image', 'video'],
    ['clean'],
  ],
};
  
//    this.editorModules = {
//     toolbar: [
//       ['bold', 'italic', 'underline', 'strike'],        // Formatting
//       [{ header: 1 }, { header: 2 }],                  // Headers
//       [{ list: 'ordered' }, { list: 'bullet' }],       // Lists
//       [{ script: 'sub' }, { script: 'super' }],        // Subscript/Superscript
//       [{ indent: '-1' }, { indent: '+1' }],            // Indent
//       [{ direction: 'rtl' }],                          // Text Direction
//       [{ size: ['small', false, 'large', 'huge'] }],   // Font Size
//       [{ header: [1, 2, 3, 4, 5, 6, false] }],         // Headers
//       [{ color: [] }, { background: [] }],             // Color Picker
//       [{ font: [] }],                                  // Font Family
//       [{ align: [] }],                                 // Text Align
//       ['link', 'image', 'video'],                      // Insert Options
//       ['clean'],
//       ['formula']  
//     ],
//     clipboard: {
//       matchVisual: false, // Prevent visual formatting when pasting
//     },
//   };
// }

