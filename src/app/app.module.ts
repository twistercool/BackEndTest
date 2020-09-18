import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './Services/app-routing.module';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    ProfileDetailsComponent,
    HomeComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
