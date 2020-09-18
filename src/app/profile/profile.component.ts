import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Profile } from '../Services/Profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  editMode:boolean;

  @Input()
  profile: Profile;

  @Output('addLikeEvent')
  likeEmitter = new EventEmitter<number>();

  @Output('deleteProfile')
  deleteEmitter = new EventEmitter<number>();

  @Output('saveEvent')
  saveEmitter = new EventEmitter<string[]>();

  constructor() {}

  ngOnInit(): void {
    this.editMode = false;
  }

  addLike() {
    return this.likeEmitter.emit();
  }

  deleteProfile() {
    return this.deleteEmitter.emit();
  }

  saveChanges(newName:string, newDes:string, newPath:string, newEmail:string) {
    this.saveEmitter.emit([newName, newDes, newPath, newEmail]);
    this.editMode = false;
  }

}
