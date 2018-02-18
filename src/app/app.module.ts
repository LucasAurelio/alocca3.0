import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularMaterialImporterModule } from './angular-material-importer/angular-material-importer.module';
import { NavbarModule } from './navbar/navbar.module';
import { ProfessorsModule } from './professors/professors.module';
import { UsersModule } from './users/users.module';
import { RequestsModule } from './requests/requests.module'

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { DataManagerService } from './data-manager/data-manager.service';
import { ProfessorsDmService } from './data-manager/professors/professors-dm.service';
import { CoursesDmService } from './data-manager/courses/courses-dm.service';
import { DialogService } from './dialog-service/dialog.service';
import { DialogModule } from './dialog-service/dialog/dialog.module';
import { CoursesModule } from './courses/courses.module';
import { SemestersModule } from './semesters/semesters.module';
import { SemestersDmService } from './data-manager/semesters/semesters-dm.service';

import { UsersDmService } from './data-manager/users/users-dm.service';
import { AuthService } from './authentication/auth.service';
import { AuthenticationModule } from "./authentication/authentication.module";
import { SemesterService } from './semesters/semester.service'
import { ProfRestrictionDmService } from './data-manager/professor-restrictions/prof-restriction-dm.service'
import { RequestsDmService } from './data-manager/requests/requests-dm.service'
import { ClassesModule } from './classes/classes.module'
import { ClassesDmService } from './data-manager/classes/classes-dm.service'

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
    AppRoutingModule,
    DialogModule,
    CoursesModule,
    SemestersModule,
    ClassesModule,
    AuthenticationModule,
    UsersModule,
    RequestsModule
  ],
  providers: [
    DataManagerService,
    DialogService,
    ProfessorsDmService,
    CoursesDmService,
    SemestersDmService,
    SemesterService,
    ProfRestrictionDmService,
    ClassesDmService,
    UsersDmService,
    AuthService,
    RequestsDmService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
