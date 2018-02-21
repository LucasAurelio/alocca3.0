import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialImporterModule } from '../angular-material-importer/angular-material-importer.module'
import { MatListModule } from '@angular/material/list';
import { NavbarModule } from '../navbar/navbar.module';
import { RouterModule } from '@angular/router';


import { LoginPageComponent } from './login/login.component';
import { HomePageComponent } from './home/home.component';

@NgModule({
    imports: [
        CommonModule,
        AngularMaterialImporterModule,
        MatListModule,
        NavbarModule,
        RouterModule
    ],
    declarations: [LoginPageComponent, HomePageComponent],
    exports: [LoginPageComponent, HomePageComponent]
})
export class AuthenticationModule { }