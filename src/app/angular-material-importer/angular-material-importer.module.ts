import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatAutocompleteModule,
         MatButtonModule,
         MatCardModule,
         MatCheckboxModule,
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
         MatToolbarModule,
         MatTooltipModule,
         MatTabsModule } from '@angular/material';

import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
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
    MatToolbarModule,
    MatTooltipModule,
    MatSidenavModule,
    MatTabsModule
  ],
  declarations: [],
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
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
    MatToolbarModule,
    MatTooltipModule,
    MatSidenavModule,
    MatTabsModule
  ]
})

export class AngularMaterialImporterModule { }
