import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(): Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap((estado) => {
        if (!estado) {
          this.router.navigate(['/login']);
        }
      }),
      take(1)
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap((rpta) => {
        if (!rpta) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
