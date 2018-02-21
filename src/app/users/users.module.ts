import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialImporterModule } from '../angular-material-importer/angular-material-importer.module'

import { AddUserComponent } from './add-user/add-user.component';
import { FormsModule }   from '@angular/forms';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AppRoutingModule } from '../app-routing.module';
import { RequestsModule } from '../requests/requests.module';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialImporterModule,
    FormsModule,
    AppRoutingModule,
    RequestsModule
  ],
  declarations: [
    AddUserComponent,
    EditUserComponent,
  ],
  exports: [
    AddUserComponent
  ]
})
export class UsersModule { }
