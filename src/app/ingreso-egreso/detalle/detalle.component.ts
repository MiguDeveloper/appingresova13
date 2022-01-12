import Swal from 'sweetalert2';
import { IngresoEgresoService } from './../../services/ingreso-egreso.service';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from './../../models/ingreso-egreso.model';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [],
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresoEgresos: IngresoEgreso[] = [];
  ingresosSubs: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.ingresosSubs = this.store
      .select('ingresosEgresos')
      .subscribe(({ items }) => {
        this.ingresoEgresos = items;
      });
  }

  ngOnDestroy() {
    if (this.ingresosSubs) {
      this.ingresosSubs.unsubscribe();
    }
  }
  borrar(uid: string) {
    this.ingresoEgresoService
      .borrarIngresoEgreso(uid)
      .then(() => {
        Swal.fire('Borrado', 'Item borrado', 'success');
      })
      .catch((err) => {
        Swal.fire('Error', err.message, 'error');
      });
  }
}
