import { isLoading, isStop } from './../../share/ui.actions';
import { AppState } from './../../app.reducer';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  cargando = false;
  uiSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.uiSubscription = this.store.select('ui').subscribe((ui) => {
      this.cargando = ui.isLoading;
      console.log('cargando subs');
    });
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  loginUser() {
    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch(isLoading());

    // Swal.fire({
    //   title: 'Espere un momento',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    this.auth
      .loginUsuario(this.loginForm.value)
      .then((credenciales) => {
        //Swal.close();
        this.store.dispatch(isStop());
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.store.dispatch(isStop());
        Swal.fire({
          title: 'error',
          icon: 'error',
          text: err.message,
        });
      });
  }
}
