import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Article } from '../article.service';
import { Router } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,ToolbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // articles$!: Observable<Article[]>;
  articles: Article[] = []; 
  filteredArticles: Article[] = []; // Array for search results
  searchQuery: string = ''; // For the search input
  // Pagination
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  sortOption: string = 'latest';

  ngOnInit() {
    this.updatePage(); // Calculate initial pagination
  }
  constructor(private router: Router) {
    this.loadArticles();

  }
  applySorting(): void {
    switch (this.sortOption) {
      case 'latest':
        this.filteredArticles.sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
        break;
      case 'popular':
        this.filteredArticles.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'editorsPick':
        this.filteredArticles.sort((a, b) => a.thumbnail.toString().localeCompare(b.thumbnail.toString()));
        break;
    }
    this.updatePage();
  }

  loadArticles() {
    const savedArticles = localStorage.getItem('articles'); 
    if (savedArticles) {
      this.articles = JSON.parse(savedArticles);
      this.filteredArticles = [...this.articles];
      this.totalPages = Math.ceil(this.filteredArticles.length / this.pageSize);
      this.updatePage();
    }
  }
  viewDetails(articleId: number): void {
    this.router.navigate(['/article', articleId]);
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
    // this.totalPages = Math.ceil(this.filteredArticles.length / this.pageSize);
    this.updatePage();
  }
  updatePage() {
    this.totalPages = Math.ceil(this.filteredArticles.length / this.pageSize);
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
