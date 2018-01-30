import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { AuthService } from './authentication/auth.service';
import { Observable } from "rxjs/Observable";
import { User } from "firebase/app";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

    authState: Observable<User>;

    constructor(public aAuth: AuthService) {
        //Sera substituido pela função
        this.authState = aAuth.authState();
    }
}
