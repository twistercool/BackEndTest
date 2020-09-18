import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, 
  AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Profile } from './Profile';
import { ProfilesService } from './profiles.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
profile: Observable<Profile>;
isLoggedIn: Boolean;

  constructor(
    private fireStoreAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private profilesService: ProfilesService) 
    {
      this.profile = this.fireStoreAuth.authState.pipe(
        switchMap(currentProfile => {
          if (currentProfile) {
            //if the user is logged in
            return this.firestore.doc<Profile>(`profiles/${currentProfile.uid}`).valueChanges();
          }
          else {
            return of(null); //tells when the user is not logged in
          }
        })
      );

      this.fireStoreAuth.onAuthStateChanged(user => {
        if (user) {
          this.isLoggedIn = true;
        }
        else {
          this.isLoggedIn = false;
        }
      });
    }
    
    async emailSignIn() {
      const provider = new auth.EmailAuthProvider();
      const credential = await this.fireStoreAuth.signInWithPopup(provider);
      this.firestore.firestore.doc(`/profiles/${credential.user.uid}`).get()
      .then(docSnapshot => {
        if (!docSnapshot.exists) {
          //if the user doesn't exist, create a new one
          return this.createNewAccountGoogle(credential.user);
        }
        else {
          console.log('account signed in');
        }
      });
    }

    async googleSignIn() {
      const provider = new auth.GoogleAuthProvider();
      const credential = await this.fireStoreAuth.signInWithPopup(provider);
      this.firestore.firestore.doc(`/profiles/${credential.user.uid}`).get()
      .then(docSnapshot => {
        if (!docSnapshot.exists) {
          //if the user doesn't exist, create a new one
          return this.createNewAccountGoogle(credential.user);
        }
        else {
          console.log('account signed in');
        }
      });
    }

    async createNewAccountGoogle(user) {
      console.log('trying to create new user');
      return this.profilesService.createNewProfile({uid: user.uid, 
        name: user.displayName, 
        description: '', 
        image_path: 'assets/Img/slider_puffin_jpegmini_mobile.jpg', 
        email: user.email,
        total_likes: 0});
    }

    goggleSignOut() {
      this.fireStoreAuth.signOut();
      return this.router.navigate(['/']);
    }
}
