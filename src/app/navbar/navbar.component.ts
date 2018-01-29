import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { AddSemesterComponent } from "../semesters/add-semester/add-semester.component"
import { SemestersDmService } from '../data-manager/semesters/semesters-dm.service'
import { Semester } from '../semesters/semester'
import { DialogService } from "../dialog-service/dialog.service"
import { OrderBy } from '../utils/order-by-pipe'
import { SemesterService } from '../semesters/semester.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  semestersList; 
  selectedSemester: string;

  constructor(
    private dialog: MatDialog,
    private semDmService: SemestersDmService,
    private dialogService: DialogService,
    private snackBar: MatSnackBar,
    private semesterService: SemesterService
  ) { }

  ngOnInit() {
    this.semDmService.getSemesters().subscribe( semesters => {
      this.semestersList = semesters;
    })

    this.semesterService.getSemesterEmitter().subscribe( (semesterKey) => {
      this.semDmService.getSemesterById(semesterKey).valueChanges().subscribe( (semester) => {
        this.selectedSemester = semester.identifier;
      });
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
        if (semester.identifier == this.selectedSemester) {
          this.semesterService.emitSemester(this.semestersList[0].key);
        }
      }
    });
  }

  onSemesterSelected(semesterKey: string) {
    this.semesterService.emitSemester(semesterKey);
  }

}