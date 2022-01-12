import { IngresoEgreso } from './../../models/ingreso-egreso.model';
import { AppState } from './../../app.reducer';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [],
})
export class EstadisticaComponent implements OnInit {
  ingresos = 0;
  egresos = 0;
  totalEgresos = 0;
  totalIngresos = 0;

  // Doughnut
  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [] }],
  };

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select('ingresosEgresos')
      .subscribe(({ items }) => this.generarEstadistica(items));
  }

  generarEstadistica(items: IngresoEgreso[]) {
    this.ingresos = 0;
    this.egresos = 0;
    this.totalIngresos = 0;
    this.totalEgresos = 0;

    items.forEach((item) => {
      if (item.tipo === 'ingreso') {
        this.totalIngresos += item.monto;
        this.ingresos++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos++;
      }
    });

    this.doughnutChartData.datasets[0].data = [
      this.totalIngresos,
      this.totalEgresos,
    ];
  }

  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}
