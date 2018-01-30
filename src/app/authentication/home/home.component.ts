import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomePageComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router) {
    }
    ngOnInit() {
    }
    logout() {
        this.authService.logout();
        this.router.navigate(['login']);
    }
}