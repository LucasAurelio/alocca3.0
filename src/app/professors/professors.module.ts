import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialImporterModule } from '../angular-material-importer/angular-material-importer.module'

import { AddProfessorComponent } from './add-professor/add-professor.component';
import { FormsModule }   from '@angular/forms';
import { EditProfessorComponent } from './edit-professor/edit-professor.component';
import { AppRoutingModule } from '../app-routing.module'

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialImporterModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [AddProfessorComponent, EditProfessorComponent],
  exports: [AddProfessorComponent]
})
export class ProfessorsModule { }
