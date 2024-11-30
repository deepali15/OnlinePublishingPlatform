import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Author } from './author-directory/author-directory.component';

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
   getArticle(id: number): Observable<Article | undefined> {
    return new Observable(observer => {
      const article = this.articles.find(a => a.id === id);
      observer.next(article);
      observer.complete();
    });
  }
   getArticles(): Observable<Article[]> {
    return of(this.articles);
  }
   private loadArticle() {
    if (this.isBrowser) {
      const savedArticle = localStorage.getItem('articles');
      if (savedArticle) {
        this.articles = JSON.parse(savedArticle);
        this.articleSubject.next(this.articles);
      }
    }
  }
  private saveArticle() {
    if (this.isBrowser) {
      localStorage.setItem('articles', JSON.stringify(this.articles));
    }
  }
  addArticle(article: Article): void {
    article.id = this.articles.length + 1;
    article.publishDate= new Date();

    const currentUser  = localStorage.getItem('currentUser');
    if (currentUser ) {
      const user = JSON.parse(currentUser ) as Author;
      article.authorName = user.authorName; // Set the author name from the current user
    } else {
      article.authorName = 'Unknown'; // Handle case where there is no user
    }
    console.log("current user: ",currentUser)
    console.log("article : ",article)
    this.articles.push(article);
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
  popularity: number;
}

