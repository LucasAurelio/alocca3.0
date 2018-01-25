import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule,
         MatCardModule,
         MatFormFieldModule,
         MatInputModule,
         MatOptionModule,
         MatSelectModule,
         MatSnackBarModule,
         MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule
  ],
  declarations: [],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule
  ]
})

export class AngularMaterialImporterModule { }