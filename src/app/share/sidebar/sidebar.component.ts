import { Subscription, filter } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit, OnDestroy {
  usuario = '';
  userSubs: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubs = this.store
      .select('user')
      .pipe(filter(({ user }) => user != null))
      .subscribe(({ user }) => (this.usuario = user.nombre));
  }

  logout() {
    this.authService.logoutUser().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
