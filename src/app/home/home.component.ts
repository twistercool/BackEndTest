import { Component, OnInit } from '@angular/core';
import { ProfilesService } from "src/app/Services/profiles.service";
import { Profile } from '../Services/Profile';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profiles: Observable<Profile[]>;

  constructor(private service: ProfilesService) {
    console.log('loaded service');
  }

  ngOnInit() {
    this.profiles = this.service.getProfiles().valueChanges();
  }

  addLike(uid:string) {
    this.service.addLikeToProfile(uid);
  }

  addNewProfile() {
    this.service.addEmptyProfile();
  }

  deleteProfile(uid:string) {
    this.service.deleteProfile(uid);
  }

  saveProfile(newSaveData:string[], uid:string) {
    //newSaveData has the name, the description and the image path
    this.service.updateProfile(uid, newSaveData[0], newSaveData[1], newSaveData[2], newSaveData[3]);
  }
}
