import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from "./dialog.component"
import { AngularMaterialImporterModule } from '../../angular-material-importer/angular-material-importer.module'


@NgModule({
  imports: [
    CommonModule,
    AngularMaterialImporterModule
  ],
  declarations: [ DialogComponent ],
  exports: [ DialogComponent ],
  bootstrap: [DialogComponent]
})

export class DialogModule { }
