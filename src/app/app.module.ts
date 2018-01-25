import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularMaterialImporterModule } from './angular-material-importer/angular-material-importer.module'
import { NavbarModule } from './navbar/navbar.module'
import { ProfessorsModule } from './professors/professors.module'

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { DataManagerService } from './data-manager/data-manager.service'
import { ProfessorsDmService } from './data-manager/professors/professors-dm.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    AngularMaterialImporterModule,
    NavbarModule,
    ProfessorsModule,
    AppRoutingModule
  ],
  providers: [
    DataManagerService,
    ProfessorsDmService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }