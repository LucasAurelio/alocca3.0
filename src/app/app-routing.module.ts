import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddProfessorComponent } from './professors/add-professor/add-professor.component';
import { EditProfessorComponent } from './professors/edit-professor/edit-professor.component';
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { EditCourseComponent } from './courses/edit-course/edit-course.component';
import { ProfessorRestrictionComponent } from './professors/professor-restriction/professor-restriction.component';
import { AddClassComponent } from './classes/add-class/add-class.component';
import { EditClassComponent } from './classes/edit-class/edit-class.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { LoginPageComponent } from './authentication/login/login.component';
import { HomePageComponent } from './authentication/home/home.component';
import { RequestAccessComponent } from './requests/request-access/request-access.component';
<<<<<<< HEAD
import { SchedulesTableComponent} from './schedules/schedules-table/schedules-table.component';
=======
import { AlertsComponent } from './alerts/alerts.component'

>>>>>>> eb9af394f034b0d80c9f8a4ef5aa673130aebc93

const routes: Routes = [
  { path: 'professors', component: AddProfessorComponent },
  { path: 'edit_professor/:id', component: EditProfessorComponent },
  { path: 'courses', component: AddCourseComponent },
  { path: 'edit_course/:id', component: EditCourseComponent },
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'prof_restriction/:id', component: ProfessorRestrictionComponent },
  { path: 'classes', component: AddClassComponent },
  { path: 'edit_class/:id', component: EditClassComponent},
  { path: 'users', component: AddUserComponent },
  { path: 'edit_user/:id', component: EditUserComponent },
  { path: 'requestAccess', component: RequestAccessComponent },
<<<<<<< HEAD
  { path: 'schedules-table', component: SchedulesTableComponent}
=======
  { path: 'alerts', component: AlertsComponent }
>>>>>>> eb9af394f034b0d80c9f8a4ef5aa673130aebc93
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
