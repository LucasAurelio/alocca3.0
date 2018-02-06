import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddClassComponent } from './add-class/add-class.component';
import { AngularMaterialImporterModule } from '../angular-material-importer/angular-material-importer.module'
import { AppRoutingModule } from '../app-routing.module'
import { ReactiveFormsModule }   from '@angular/forms';
import { EditClassComponent } from './edit-class/edit-class.component';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialImporterModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddClassComponent, EditClassComponent]
})
export class ClassesModule { }
