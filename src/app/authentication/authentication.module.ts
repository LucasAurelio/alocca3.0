import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialImporterModule } from '../angular-material-importer/angular-material-importer.module'

import { LoginPageComponent } from './login/login.component';
import { HomePageComponent } from './home/home.component';

@NgModule({
    imports: [
        CommonModule,
        AngularMaterialImporterModule
    ],
    declarations: [LoginPageComponent, HomePageComponent],
    exports: [LoginPageComponent, HomePageComponent]
})
export class AuthenticationModule { }