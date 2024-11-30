import { Component, inject } from '@angular/core';
import { Author } from '../author-directory/author-directory.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})
export class AuthorComponent {
  author: Author | undefined;
  constructor(
    private activeRoute: ActivatedRoute,
  ) { }
  router = inject(Router);
  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      const id = +params['id'];
      this.getAuthor(id).subscribe(author => {
        this.author = author;
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

}
