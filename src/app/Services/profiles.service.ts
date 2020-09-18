import { Injectable } from '@angular/core';
import { Profile } from "src/app/Services/Profile";
import { firestore } from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  constructor(private firestore: AngularFirestore) { 

  }

  getProfiles(): AngularFirestoreCollection<Profile> {
    const damn = this.firestore.collection<Profile>('profiles').snapshotChanges();
    return this.firestore.collection<Profile>('profiles', ref => ref.orderBy('time', 'desc'));
  }

  addLikeToProfile(uid:string) {
    console.log(`the uid is: ${uid}`);
    console.log(`and the full object stored in firestore is: `,
        this.firestore.collection('profiles').doc<Profile>(uid).get().toPromise().then( doc => {
          console.log(doc.data())
    }));
    return this.firestore.doc(`profiles/${uid}`).update({total_likes: firestore.FieldValue.increment(1)});
  }

  addEmptyProfile() {
    console.log('new profile has been created');
    let newID = this.firestore.createId();
    return this.firestore.collection('profiles').doc(newID)
        .set({name: '', description:'', uid: newID,
          image_path: "assets/Img/slider_puffin_jpegmini_mobile.jpg",
          total_likes: 0,
          email: "",
          time: firestore.FieldValue.serverTimestamp()
        });
  }

  deleteProfile(uid:string) {
    return this.firestore.collection('profiles').doc(uid).delete();
  }

  updateProfile(uid:string, newName:string, newDescription:string, newPath:string, newEmail:string) {
    return this.firestore.doc(`profiles/${uid}`).update({name: newName, description: newDescription,
      image_path: newPath, email: newEmail, time: firestore.FieldValue.serverTimestamp()});
  }

  createNewProfile({uid, name, description, image_path, email}: Profile) {
    console.log('account created');
    return this.firestore.doc(`profiles/${uid}`).set({uid: uid, name: name, description: description,
      image_path: image_path, email: email, total_likes: 0, time: firestore.FieldValue.serverTimestamp()});
  }
}

