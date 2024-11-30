import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Article, ArticleService } from '../article.service';
import { FormsModule } from '@angular/forms';
import { Author } from '../author-directory/author-directory.component';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit{
  article: Article | undefined;
  comments: { author: string; text: string }[] = [];
  newComment = { author: '', text: '' }; // Model for the new comment

  constructor(
    private activeRoute: ActivatedRoute,
    private articleService: ArticleService
  ) { }
  router = inject(Router);
  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      const id = +params['id'];
      this.articleService.getArticle(id).subscribe(article => {
        this.article = article;
        const storedComments = localStorage.getItem(`comments-${id}`);
        this.comments = storedComments ? JSON.parse(storedComments) : [];
      });
    });
}
backHome(): void {
  this.router.navigate(['/home']);
}
getImage(imageName: string): string {
  const imageData = localStorage.getItem(imageName);
  return imageData ? imageData : 'path/to/default/image.jpg'; // Fallback to a default image if not found
}
addComment(): void {
  if (this.newComment.text.trim()) {
    // Add the new comment to the comments array
    const currentUser  = localStorage.getItem('currentUser');
    if(currentUser){
    const author = JSON.parse(currentUser ) as Author;
    
    this.newComment.author=author.authorName;
    }
    this.comments.push({ ...this.newComment });

    // Save the updated comments to localStorage
    if (this.article) {
      localStorage.setItem(`comments-${this.article.id}`, JSON.stringify(this.comments));
    }

    // Clear the comment form
    this.newComment = { author: '', text: '' };
  } else {
    alert('Please fill out both fields before submitting!');
  }
}
}
