import { map } from 'rxjs';
import { IngresoEgreso } from './../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  constructor(
    private angularFirestore: AngularFirestore,
    private authService: AuthService
  ) {}

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = this.authService.user.uid;
    return this.angularFirestore
      .doc(`${uid}/ingreso-egreso`)
      .collection('items')
      .add({ ...ingresoEgreso });
  }

  initIngresosEgresosListener(uid: string) {
    return this.angularFirestore
      .collection(`${uid}/ingreso-egreso/items`)
      .snapshotChanges()
      .pipe(
        map((snapshot) => {
          return snapshot.map((doc) => {
            const data: any = doc.payload.doc.data();
            return {
              uid: doc.payload.doc.id,
              ...data,
            };
          });
        })
      );
  }

  borrarIngresoEgreso(uidItem: string) {
    const uid = this.authService.user.uid;
    return this.angularFirestore
      .doc(`${uid}/ingreso-egreso/items/${uidItem}`)
      .delete();
  }
}
