import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialImporterModule } from '../angular-material-importer/angular-material-importer.module'

import { AddProfessorComponent } from './add-professor/add-professor.component';
import { FormsModule }   from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialImporterModule,
    FormsModule
  ],
  declarations: [AddProfessorComponent],
  exports: [AddProfessorComponent]
})
export class ProfessorsModule { }
