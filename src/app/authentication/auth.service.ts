import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsersDmService } from '../data-manager/users/users-dm.service';
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

    loginPage: boolean;
    constructor(
        public afAuth: AngularFireAuth,
        public usersDmService: UsersDmService,
        public snackbarService: MatSnackBar,
        public router: Router)
        {
          this.loginPage = true;
        }

    login() {
        var self = this;
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
            function (result) {
                var token = result.credential.accessToken;
                var user = result.user;
                console.log(user.email);
                self.usersDmService.checkEmail(user.email).then(
                    exists => {
                        if (!exists) {
                            self.snackbarService.open("Você não tem permissão de acesso. Por favor, solicite acesso!", null, { duration: 3500 });
                            self.logout();
                        }
                        else {
                            self.snackbarService.open("Login realizado com sucesso.", null, { duration: 2500 });
                        }
                    }
            )}
        ).catch(
            function (err) { setTimeout(function () { throw err; }); });
    }

    logout() {
        return this.afAuth.auth.signOut();
    }

    authState() {
        return this.afAuth.authState;
    }

    getLoginPage(){
      return this.loginPage;
    }
}
