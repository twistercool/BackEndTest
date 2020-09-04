import { Injectable } from '@angular/core';
import { Profile } from "src/app/Profile";
import { firestore } from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  constructor(private firestore: AngularFirestore) { 

  }

  getProfiles(): AngularFirestoreCollection<Profile> {
    console.log(this.firestore.collection('profiles'));
    return this.firestore.collection<Profile>('profiles');
  }

  addLikeToProfile(uid:string) {
    console.log(`the uid is: ${uid}`);
    console.log(`and the full object stored in firestore is: `, this.firestore.collection('profiles').doc<Profile>(uid).get().toPromise().then( doc => {
      console.log(doc.data())
    }));
    return this.firestore.doc(`profiles/${uid}`).update({total_likes: firestore.FieldValue.increment(1)});
  }

  addProfile() {
    console.log('new profile has been created');
    let newID = this.firestore.createId();
    return this.firestore.collection('profiles').doc(newID).set({name: '', description:'', uid: newID, image_path: "assets/Img/slider_puffin_jpegmini_mobile.jpg", total_likes: 0});
  }

  deleteProfile(uid:string) {
    return this.firestore.collection('profiles').doc(uid).delete();
  }

  updateProfile(uid:string, newName:string, newDescription:string, newPath:string) {
    return this.firestore.doc(`profiles/${uid}`).update({name: newName, description: newDescription, image_path: newPath});
  }
}

