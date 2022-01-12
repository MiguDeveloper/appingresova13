import { StoreModule } from '@ngrx/store';
import { DashboardRoutesModule } from './../dashboard/dashboard-routes.module';
import { ShareModule } from './../share/share.module';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdenIngresoPipe } from './../pipes/orden-ingreso.pipe';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoPipe,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer),
    ShareModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule,
    DashboardRoutesModule,
  ],
})
export class IngresoEgresoModule {}
