import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './article/article.component';
import { LoginComponent } from './login/login.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthorDirectoryComponent } from './author-directory/author-directory.component';
import { AuthorComponent } from './author/author.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'article/:id', component: ArticleComponent,canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'create-post', component: CreatePostComponent,canActivate: [AuthGuard] },
      { path: 'author-directory', component: AuthorDirectoryComponent,canActivate: [AuthGuard] },
      { path: 'signup', component: SignupComponent },
      { path: 'author/:id', component: AuthorComponent,canActivate: [AuthGuard] },
      
];
