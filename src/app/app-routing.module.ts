import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddProfessorComponent } from './professors/add-professor/add-professor.component'
import { EditProfessorComponent } from './professors/edit-professor/edit-professor.component'

const routes: Routes = [
  { path: 'professors', component: AddProfessorComponent },
  { path: 'edit_professor/:id', component: EditProfessorComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }