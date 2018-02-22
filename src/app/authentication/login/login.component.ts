import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginPageComponent implements OnInit {

    constructor(public authService: AuthService, private router: Router) {
    }
    ngOnInit() {
    }

    isLoginPage(){
        if(this.router.url=='/'){
            return true;
        }else{
            return false;
        }
    }

    login() {
        this.authService.login();
        this.router.navigateByUrl('');
    }
}
