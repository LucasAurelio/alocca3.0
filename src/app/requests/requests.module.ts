import { NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { AngularMaterialImporterModule } from '../angular-material-importer/angular-material-importer.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule }   from '@angular/forms';

import { AppRoutingModule } from '../app-routing.module';

import { RequestAccessComponent } from './request-access/request-access.component';
import { ViewRequestsComponent } from './view-requests/view-requests.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AngularMaterialImporterModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ReactiveFormsModule
      ],
    declarations: [
        RequestAccessComponent,
        ViewRequestsComponent
        ],
    exports: [RequestAccessComponent, ViewRequestsComponent]
})

export class RequestsModule {}
