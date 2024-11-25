import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
// import { environment } from './environments/environment';
// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { getAuth, provideAuth } from '@angular/fire/auth';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


// bootstrapApplication(AppComponent, {
//   providers: [
//     provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
//     provideAuth(() => getAuth())
//   ]
// }).catch(err => console.error(err));
