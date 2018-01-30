import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { AddSemesterComponent } from "../semesters/add-semester/add-semester.component"
import { SemestersDmService } from '../data-manager/semesters/semesters-dm.service'
import { Semester } from '../semesters/semester'
import { DialogService } from "../dialog-service/dialog.service"
import { OrderBy } from '../utils/order-by-pipe'
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  semestersList: JSON[];
  selectedSemester: string;

  constructor(
    private dialog: MatDialog,
    private semDmService: SemestersDmService,
    private authService: AuthService,
    private dialogService: DialogService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.semDmService.getSemesters().subscribe( semesters => {
      this.semestersList = semesters;
    })
  }

  addNewSemester() {
    let dialogRef = this.dialog.open(AddSemesterComponent);
  }

  deleteSemester(semester: Semester, firebaseId: string) {
    var title = "Excluir Semestre";
    var message = "Todas as informações de "+semester.identifier+" serão apagadas";
    var posAct = "Excluir";
    var negAct = "Cancelar";
    this.dialogService.openDialog(title, message, posAct, negAct).subscribe( (result) => {
      if (result) {
        this.semDmService.deleteSemester(firebaseId).catch(() => {
          this.snackBar.open("Desculpe. Não foi possível excluir o semestre", null, {duration: 2500});      
        });
      }
    })   
  }

  onSemesterSelected(semIdentifier: string, semKey: string) {
    this.selectedSemester = semIdentifier;
    console.log(semIdentifier);
  }

  logout() {
      this.authService.logout();
  }

}