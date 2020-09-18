import { Component, OnInit } from '@angular/core';
import { Profile } from '../Services/Profile';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  profile:Observable<Profile>;


  constructor(private fireStore: AngularFirestore, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.profile = this.route.paramMap.pipe(
      switchMap(param => {
        const uid = param.get('uid');
        return this.fireStore.collection('profiles').doc<Profile>(uid).valueChanges();
      })
    );
  }

}
