import { isLoading, isStop } from './../../share/ui.actions';
import { AppState } from './../../app.reducer';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit, OnDestroy {
  formRegister: FormGroup;
  uiSubscription: Subscription;
  cargando = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.uiSubscription = this.store
      .select('ui')
      .subscribe((ui) => (this.cargando = ui.isLoading));
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  submitForm() {
    if (this.formRegister.invalid) {
      return;
    }

    this.store.dispatch(isLoading());

    // Swal.fire({
    //   title: 'Espere un momento',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    this.authService
      .crearUsuario(this.formRegister.value)
      .then((credenciales) => {
        console.log(credenciales);
        // Swal.close();
        this.store.dispatch(isStop());
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.store.dispatch(isStop());
        Swal.fire({
          icon: 'error',
          title: 'upss',
          text: err.message,
        });
        console.log(err);
      });
  }
}
