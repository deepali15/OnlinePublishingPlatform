import { Component, inject, OnInit } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Article } from '../article.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-author-directory',
  standalone: true,
  imports: [CommonModule,FormsModule,ToolbarComponent],
  templateUrl: './author-directory.component.html',
  styleUrl: './author-directory.component.css'
})
export class AuthorDirectoryComponent {
  authors$!: Observable<Author[]>;

  authors: Author[] = [];
  filteredArticles: Article[] = [];
  filteredAuthors: Author[] = [];
  searchQuery: string = '';
  trendingKeywords: string[] = [
    'Everything Explained',
    'Tech Reads',
    'Family Therapy'
  ];
  articles: Article[] = []; 
  selectedCategory: string = '';
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
        article.category.toLowerCase().includes(author.category)
    );
    }
  }
  

  onSearch(): void {
    if (this.selectedCategory==='articles'){
      console.log("searching Articles", this.selectedCategory)
      if (this.searchQuery.trim()===''){
        this.filteredArticles=this.articles;
        }else{
          this.filteredArticles = this.articles.filter(
            (article) =>{
              const thumbnail= article.thumbnail || '';
          const description= article.description || '';
          const authorName= article.authorName || '';
          return thumbnail.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          description.toLowerCase().includes(this.searchQuery.toLowerCase())
      });
      }
    }
else if (this.selectedCategory==='authors'){
  console.log(" searching authors", this.selectedCategory)
  if (this.searchQuery.trim()===''){
    this.filteredAuthors=this.authors;
    }else{
      this.filteredAuthors = this.authors.filter(
        (author) =>{
          const name= author.authorName || '';
      return name.toLowerCase().includes(this.searchQuery.toLowerCase())
    });
  }
}
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
  viewDetails(authorId: number): void {
    this.router.navigate(['/author', authorId]);
  }
  readMore(articleId: number): void {
    this.router.navigate(['/article', articleId]);
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


