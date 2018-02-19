import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginPageComponent implements OnInit {

    loginPage: boolean;

    constructor(public authService: AuthService, private router: Router) {
      this.loginPage = this.authService.getLoginPage();
    }
    ngOnInit() {
    }

    login() {
        this.authService.login();
        this.router.navigateByUrl('');
    }

    requestAccess(){
      this.authService.requestAccess();
      this.loginPage = this.authService.getLoginPage();
    }
}
