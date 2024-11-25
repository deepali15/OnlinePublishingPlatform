// import { Injectable } from '@angular/core';
// import { Auth, signInWithPopup, GoogleAuthProvider, signOut, User, UserCredential, authState } from '@angular/fire/auth';
// import { Observable } from 'rxjs';


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor(private auth: Auth) { }

//   signInWithGoogle(): Promise<UserCredential> {
//     const provider = new GoogleAuthProvider();
//     return signInWithPopup(this.auth, provider);
//   }

//   signOut(): Promise<void> {
//     return signOut(this.auth);
//   }

//   get user$(): Observable<User | null> {
//     return authState(this.auth);
//   }
// }
