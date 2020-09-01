import { Component } from '@angular/core';
import { ProfilesService } from "src/app/profiles.service";
import { Profile } from './Profile';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
    this.service.addProfile();
  }

  deleteProfile(uid:string) {
    this.service.deleteProfile(uid);
  }

  saveProfile(newSaveData:string[], uid:string) {
    //newSaveData has the name, the description and the image path
    this.service.updateProfile(uid, newSaveData[0], newSaveData[1], newSaveData[2]);
  }
}
