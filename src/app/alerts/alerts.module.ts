import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialImporterModule } from '../angular-material-importer/angular-material-importer.module'
import { AppRoutingModule } from '../app-routing.module'
import { ReactiveFormsModule }   from '@angular/forms';
import { FormsModule }   from '@angular/forms';

import { AlertsComponent } from './alerts.component'

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialImporterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [AlertsComponent],
  exports: [AlertsComponent]
})
export class AlertsModule { }
