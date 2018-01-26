import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from "./dialog/dialog.component"

@Injectable()
export class DialogService {

  constructor(public dialog: MatDialog) { }

  public openDialog(title: string, message: string, positiveAction: string, negativeAction: string) {

    let dialogRef = this.dialog.open(DialogComponent, {
      data: { title: title,
              message: message, 
              posAct: positiveAction.toUpperCase(),
              negAct: negativeAction.toUpperCase()
            }
    });

   return dialogRef.afterClosed();
  }
  

}
