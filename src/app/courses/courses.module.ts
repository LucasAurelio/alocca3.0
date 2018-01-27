import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { AngularMaterialImporterModule } from '../angular-material-importer/angular-material-importer.module'
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module'

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialImporterModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [AddCourseComponent, EditCourseComponent]
})
export class CoursesModule { }
