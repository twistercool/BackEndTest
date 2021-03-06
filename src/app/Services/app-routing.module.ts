import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileDetailsComponent } from '../profile-details/profile-details.component';
import { HomeComponent } from '../home/home.component';
import { LoginPageComponent } from '../login-page/login-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginPageComponent},
  { path: ':uid',
    component: ProfileDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
