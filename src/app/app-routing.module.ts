import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddProfessorComponent } from './professors/add-professor/add-professor.component'

const routes: Routes = [
  { path: 'professors', component: AddProfessorComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }