import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { AddSemesterComponent } from "../semesters/add-semester/add-semester.component"
import { SemestersDmService } from '../data-manager/semesters/semesters-dm.service'
import { UsersDmService } from '../data-manager/users/users-dm.service';
import { Semester } from '../semesters/semester'
import { DialogService } from "../dialog-service/dialog.service"
import { OrderBy } from '../utils/order-by-pipe'
import { Router } from '@angular/router';
import { SemesterService } from '../semesters/semester.service'
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  semestersList;
  selectedSemester: string;
  userPermission: boolean;


  constructor(
    private dialog: MatDialog,
    private semDmService: SemestersDmService,
    private usersDmService: UsersDmService,
    private authService: AuthService,
    private dialogService: DialogService,
    private snackBar: MatSnackBar,
    private semesterService: SemesterService,
    private router: Router,
    public aAuth: AuthService
  ) {
    console.log(' navbar constructor');
  }

  ngOnInit() {
    this.semDmService.getSemesters().subscribe( semesters => {
      this.semestersList = semesters;
      // mudar isso para pegar o semestre mais atual ao inves do de indice 0
      this.semesterService.emitSemester(this.semestersList[0].key)
    })

    this.semesterService.getSemesterEmitter().subscribe( (semesterKey) => {
      this.semDmService.getSemesterByKey(semesterKey).valueChanges().subscribe( (semester) => {
        this.selectedSemester = semester.identifier;
      });
    })

    this.isAdmin();

    console.log(' navbar onInit()');

  }

  addNewSemester() {
    let dialogRef = this.dialog.open(AddSemesterComponent);
  }

  deleteSemester(semester: Semester, firebaseId: string) {
    var title = "Excluir Semestre";
    var message = "Todas as informações de "+semester.identifier+" serão apagadas";
    var posAct = "Excluir";
    var negAct = "Cancelar";
    var noException = true;
    this.dialogService.openDialog(title, message, posAct, negAct).subscribe( (result) => {
      if (result) {
        this.semDmService.deleteSemester(firebaseId).catch(() => {
          this.snackBar.open("Desculpe. Não foi possível excluir o semestre", null, {duration: 2500});
          noException = false;
        });
        if(noException){
          this.snackBar.open("Semestre excluído com sucesso", null, {duration: 2500});
        }
        if (semester.identifier == this.selectedSemester) {
          this.semesterService.emitSemester(this.semestersList[0].key);
        }
      }
    });
  }

  onSemesterSelected(semesterKey: string) {
    this.semesterService.emitSemester(semesterKey);
  }

  logout() {
    this.router.navigateByUrl('');
    this.authService.logout();
    this.snackBar.open("Você não está mais logado. Até logo! :)", null, {duration: 2500});
  }

  isAdmin(){
    return this.aAuth.getCurrentBinaryPermission().then(
      binPerm => {
        if(binPerm == 1){
          console.log(binPerm);
          this.userPermission = true;
        }else if(binPerm == 0){
          console.log(binPerm);
          this.userPermission = false;
    }
      }
    )
  }

}
