import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  // private user: User;
  // private isBrowser: boolean;
  // constructor(@Inject(PLATFORM_ID) platformId: Object) {
  //   this.isBrowser = isPlatformBrowser(platformId);
  //   if (this.isBrowser) {
  //     this.getUser();
  //   }
  // }
  // getUser(){
  //   this.user= localStorage.getItem('currentUser');
 
  // }
        
}
export interface User{
  id:number;
  name: string;
  email: string;
}
