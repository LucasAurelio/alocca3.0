import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSemesterComponent } from './add-semester/add-semester.component';
import { AngularMaterialImporterModule } from '../angular-material-importer/angular-material-importer.module'
import { FormsModule }   from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialImporterModule,
    FormsModule
  ],
  declarations: [AddSemesterComponent],
  bootstrap: [AddSemesterComponent]
})

export class SemestersModule { }
