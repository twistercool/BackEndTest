import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.profile.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        console.log('notLoggedIn');
      })
    );
  }
  
}
