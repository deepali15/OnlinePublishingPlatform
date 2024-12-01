import { Component, inject } from '@angular/core';
import { Author } from '../author-directory/author-directory.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Article } from '../article.service';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})

export class AuthorComponent {
  author: Author | undefined;
  filteredArticles: Article[] = [];
  articles: Article[] = []; 
  constructor(
    private activeRoute: ActivatedRoute,
  ) { }
  router = inject(Router);
  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      const id = +params['id'];
      this.getAuthor(id).subscribe(author => {
        this.author = author;
        this.loadArticles();
      });
    }); 
}

getAuthor(id: number): Observable<Author | undefined> {
  const authors = JSON.parse(localStorage.getItem('authors') || '[] ') as Author[];
  const author = authors.find(a => a.id === id);
  return of(author);
}
backToProfile(){
  this.router.navigate(['/author-directory']);
}
loadArticles(){
  const savedArticles = localStorage.getItem('articles'); 
  if (savedArticles) {
    this.articles = JSON.parse(savedArticles);
  }
  console.log("author name",this.author?.authorName)
  // const currentUser  = localStorage.getItem('currentUser');
  if(this.author){
  // const author = JSON.parse(currentUser ) as Author;
  this.filteredArticles = this.articles.filter(
    (article) =>
      article.authorName === this.author?.authorName
  );
  }
}
getImage(imageName: string): string {
  const imageData = localStorage.getItem(imageName);
  return imageData ? imageData : 'path/to/default/image.jpg'; // Fallback to a default image if not found
}
viewDetails(articleId: number): void {
  this.router.navigate(['/article', articleId]);
}
}
