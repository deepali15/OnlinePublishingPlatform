import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Article, ArticleService } from '../article.service';
import { Observable } from 'rxjs';
import { Router } from 'express';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // articles$!: Observable<Article[]>;
  articles: Article[] = []; 
  filteredArticles: Article[] = []; // Array for search results
  searchQuery: string = ''; // For the search input
  isBrowser: any;
  // Pagination
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;

  constructor(private router: Router) {
    this.loadArticles();
    // this.updatePage();

  }

  loadArticles() {
    const savedArticles = localStorage.getItem('articles'); // Assuming articles are stored under 'apartments'
    if (savedArticles) {
      this.articles = JSON.parse(savedArticles);
      this.filteredArticles = [...this.articles]; // Initialize filtered articles
      this.totalPages = Math.ceil(this.filteredArticles.length / this.pageSize);
      this.updatePage();
    }
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.filteredArticles = this.articles.filter(
        (article) =>
          article.thumbnail.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          article.authorName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredArticles = [...this.articles];
    }
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredArticles.length / this.pageSize);
    this.updatePage();
  }
  updatePage() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    // Use filteredArticles if a search is active, otherwise use articles
    // this.filteredArticles =this.searchQuery.trim() !== '' ? this.filteredArticles : [...this.articles];
    this.filteredArticles = this.filteredArticles.slice(startIndex, endIndex);
  }
  onPrevious() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }

  /**
   * Navigate to the next page
   */
  onNext() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePage();
    }
  }

}
