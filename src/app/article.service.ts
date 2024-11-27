import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articles: Article[] = [];
  private articleSubject = new BehaviorSubject<Article[]>(this.articles);

  private isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.loadArticle();
      
    }
   }
   getArticles(): Observable<Article[]> {
    console.log(this.articles)
    return of(this.articles);
  }
   private loadArticle() {
    if (this.isBrowser) {
      const savedArticle = localStorage.getItem('apartments');
      if (savedArticle) {
        this.articles = JSON.parse(savedArticle);
        this.articleSubject.next(this.articles);
      }
    }
  }
  private saveArticle() {
    if (this.isBrowser) {
      localStorage.setItem('apartments', JSON.stringify(this.articles));
    }
  }
  addArticle(apartment: Article): void {
    apartment.id = this.articles.length + 1;
    this.articles.push(apartment);
    if (this.isBrowser) {
      this.saveArticle();
    }
    this.articleSubject.next(this.articles);
  }
}

export interface Article {
  id: number;
  description: string;
  authorName: String;
  thumbnail: String;
  publishDate: Date;
  image: string;
}
