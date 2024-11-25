import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './article/article.component';
import { LoginComponent } from './login/login.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
      { path: 'home', component: HomeComponent },
      { path: 'article/:id', component: ArticleComponent },
      { path: 'login', component: LoginComponent },
      { path: 'create-post', component: CreatePostComponent },
      { path: 'user', component: UserProfileComponent },
      { path: 'signup', component: SignupComponent },
  
];
