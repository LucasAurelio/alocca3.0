import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule,
         MatCardModule,
         MatFormFieldModule,
         MatIconModule,
         MatInputModule,
         MatOptionModule,
         MatSelectModule,
         MatSnackBarModule,
         MatSortModule,
         MatTableModule,
         MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule
  ],
  declarations: [],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule
  ]
})

export class AngularMaterialImporterModule { }