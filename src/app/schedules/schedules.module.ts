import { NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { AngularMaterialImporterModule } from '../angular-material-importer/angular-material-importer.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from '../app-routing.module';
import { SchedulesTableComponent } from './schedules-table/schedules-table.component';
import { AlertsModule } from '../alerts/alerts.module'; 


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialImporterModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AlertsModule
],
declarations: [
    SchedulesTableComponent
    ],
exports: []
})
export class SchedulesModule { }
