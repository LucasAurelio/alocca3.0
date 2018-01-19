import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { AngularMaterialImporterModule } from '../angular-material-importer/angular-material-importer.module'
import { AppRoutingModule } from '../app-routing.module'

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialImporterModule,
    AppRoutingModule
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent]
})
export class NavbarModule { }