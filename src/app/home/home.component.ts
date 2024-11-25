import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
articles: Article[] = []; // Array to store the articles
  filteredArticles: Article[] = []; // Array for search results
  searchQuery: string = ''; // For the search input

  // Pagination
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;

  constructor() {
    // Simulate fetching articles (replace with API call in real scenarios)
    this.fetchArticles();
  }
  fetchArticles() {
    const dummyArticles: Article[] = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      thumbnail: 'https://via.placeholder.com/300',
      title: `Sample Article ${i + 1}`,
      description: `This is a short description for article ${i + 1}.`,
      author: `Author ${i + 1}`,
      publishDate: new Date(),
    }));

    this.articles = dummyArticles;
    this.totalPages = Math.ceil(this.articles.length / this.pageSize);
    this.updatePage();
  }
  onSearch() {
    if (this.searchQuery.trim()) {
      this.filteredArticles = this.articles.filter(
        (article) =>
          article.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          article.author.toLowerCase().includes(this.searchQuery.toLowerCase())
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
    this.filteredArticles =
      this.searchQuery.trim() !== '' ? this.filteredArticles : [...this.articles];
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
interface Article {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  author: string;
  publishDate: Date;
}
