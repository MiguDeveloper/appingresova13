import { unsetItems } from './../ingreso-egreso/ingreso-egreso.actions';
import { setUser, unSetuser } from './../auth/auth.actions';
import { AppState } from './../app.reducer';
import { Store } from '@ngrx/store';
import { Usuario } from './../models/usuario.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authSubscription: Subscription;
  private _user: Usuario;

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((fuser) => {
      if (fuser) {
        this.authSubscription = this.firestore
          .doc(`${fuser.uid}/usuario`)
          .valueChanges()
          .subscribe((firestoreUser: any) => {
            const tmpUser = Usuario.fromFirebase(firestoreUser);
            this._user = tmpUser;
            this.store.dispatch(setUser({ user: tmpUser }));
          });
      } else {
        if (this.authSubscription) {
          this.authSubscription.unsubscribe();
        }
        this._user = null;
        this.store.dispatch(unSetuser());
        this.store.dispatch(unsetItems());
      }
    });
  }

  crearUsuario({ nombre, correo, password }) {
    return this.auth
      .createUserWithEmailAndPassword(correo, password)
      .then(({ user }) => {
        const newUser = new Usuario(user.uid, nombre, user.email);
        return this.firestore.doc(`${user.uid}/usuario`).set({ ...newUser });
      });
  }

  loginUsuario({ correo, password }) {
    return this.auth.signInWithEmailAndPassword(correo, password);
  }

  logoutUser() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(map((fuser) => fuser != null));
  }

  get user() {
    return { ...this._user };
  }
}
