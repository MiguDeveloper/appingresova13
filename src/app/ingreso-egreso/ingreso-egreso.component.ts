import { isLoading, isStop } from './../share/ui.actions';
import { Subscription } from 'rxjs';
import { AppState } from './../app.reducer';
import Swal from 'sweetalert2';
import { IngresoEgresoService } from './../services/ingreso-egreso.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoForm: FormGroup;
  tipo = 'ingreso';
  subsLoading: Subscription;
  cargando = false;

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
      tipo: [this.tipo],
    });

    this.subsLoading = this.store
      .select('ui')
      .subscribe((ui) => (this.cargando = ui.isLoading));
  }

  ngOnDestroy() {
    if (this.subsLoading) {
      this.subsLoading.unsubscribe();
    }
  }

  submitForm() {
    if (this.ingresoForm.invalid) {
      return;
    }
    this.store.dispatch(isLoading());

    const { descripcion } = this.ingresoForm.value;

    this.ingresoEgresoService
      .crearIngresoEgreso(this.ingresoForm.value)
      .then((ref) => {
        this.store.dispatch(isStop());
        Swal.fire({
          title: 'Registro creado',
          text: descripcion,
          icon: 'success',
        });
        this.ingresoForm.reset();
      })
      .catch((err) => {
        this.store.dispatch(isStop());
        Swal.fire('Error', err.message, 'error');
      });

    console.log(this.ingresoForm.value);
  }

  toggleTipo(tipo: string) {
    this.tipo = tipo;
    this.ingresoForm.get('tipo').setValue(tipo);
  }
}
