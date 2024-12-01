import { Component, inject, OnInit } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Article } from '../article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-directory',
  standalone: true,
  imports: [CommonModule,FormsModule,ToolbarComponent],
  templateUrl: './author-directory.component.html',
  styleUrl: './author-directory.component.css'
})
export class AuthorDirectoryComponent {

  authors: any[] = [];
  filteredArticles: Article[] = [];
  filteredAuthors: any[] = [];
  searchQuery: string = '';
  trendingKeywords: string[] = [
    'Everything Explained',
    'Tech Reads',
    'Family Therapy'
  ];
  articles: Article[] = []; 
  selectedCategory: string = 'articles';
  router = inject(Router);
  constructor() {
    this.loadArticles();
    this.loadAuthors();
  }
  loadArticles(){
    const savedArticles = localStorage.getItem('articles'); 
    if (savedArticles) {
      this.articles = JSON.parse(savedArticles);
    }
    const currentUser  = localStorage.getItem('currentUser');
    if(currentUser){
    const author = JSON.parse(currentUser ) as Author;
    this.filteredArticles = this.articles.filter(
      (article) =>
        article.authorName.toLowerCase().includes(author.authorName)
    );
    }
  }
  

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredAuthors = this.authors.filter((author) =>
      author.name.toLowerCase().includes(query)
    );
  }
  back(){
    this.router.navigateByUrl('home');
  }
  loadAuthors(){
    const savedAuthors = localStorage.getItem('authors'); 
    if (savedAuthors) {
      this.authors = JSON.parse(savedAuthors);
    }
  }
  viewDetails(articleId: number): void {
    this.router.navigate(['/author', articleId]);
  }
  getImage(imageName: string): string {
    const imageData = localStorage.getItem(imageName);
    return imageData ? imageData : 'path/to/default/image.jpg'; // Fallback to a default image if not found
  }
}


export interface Author {
  id: number;
  bio: string;
  authorName: string;
  password: string;
  email: string;
  image: string;
  popularity: number;
  category: string;
}


