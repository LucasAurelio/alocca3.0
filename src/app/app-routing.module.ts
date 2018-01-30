import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddProfessorComponent } from './professors/add-professor/add-professor.component'
import { EditProfessorComponent } from './professors/edit-professor/edit-professor.component'
import { AddCourseComponent } from './courses/add-course/add-course.component'
import { EditCourseComponent } from './courses/edit-course/edit-course.component'
import { ProfessorRestrictionComponent } from './professors/professor-restriction/professor-restriction.component'
import { AddClassComponent } from './classes/add-class/add-class.component'

import { LoginPageComponent } from './authentication/login/login.component';
import { HomePageComponent } from './authentication/home/home.component';

const routes: Routes = [
  { path: 'professors', component: AddProfessorComponent },
  { path: 'edit_professor/:id', component: EditProfessorComponent },
  { path: 'courses', component: AddCourseComponent },
  { path: 'edit_course/:id', component: EditCourseComponent },
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'prof_restriction/:id', component: ProfessorRestrictionComponent },
  { path: 'classes', component: AddClassComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
