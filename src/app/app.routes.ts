import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './article/article.component';
import { LoginComponent } from './login/login.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth/auth.guard';

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
      { path: 'user', component: UserProfileComponent,canActivate: [AuthGuard] },
      { path: 'signup', component: SignupComponent },
  
];
