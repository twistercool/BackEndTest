import { Component } from '@angular/core';
import { Profile } from './Services/Profile';
import { AuthenticationService } from "./Services/authentication.service";
import { of } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public auth: AuthenticationService) {
  }

  ngOnInit() {
  }
}
