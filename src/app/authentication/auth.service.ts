import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
    constructor(public afAuth: AngularFireAuth) { }
    login() {
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        // Verifica email
        // this.dmUsers.checkEmail(afAuth.auth.currentUser.email)
    }
    logout() {
        return this.afAuth.auth.signOut();
    }
    authState() {
        return this.afAuth.authState;
    }
}