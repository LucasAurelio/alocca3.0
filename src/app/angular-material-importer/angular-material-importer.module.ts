import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule,
         MatCardModule,
         MatDialogModule,
         MatFormFieldModule,
         MatGridListModule,
         MatIconModule,
         MatInputModule,
         MatMenuModule,
         MatOptionModule,
         MatPaginatorModule,
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
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
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
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatOptionModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule
  ]
})

export class AngularMaterialImporterModule { }