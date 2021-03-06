import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Professor } from '../professor'
import { ProfessorsDmService } from '../../data-manager/professors/professors-dm.service';
import { MatSnackBar, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DialogService } from "../../dialog-service/dialog.service";
import { Router } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-add-professor',
  templateUrl: './add-professor.component.html',
  styleUrls: ['./add-professor.component.css']
})

export class AddProfessorComponent implements OnInit {

  static readonly  REQUIRED_FIELD_ERROR_MSG = 'Campo obrigatório';
  static readonly  MIN_LENGTH_ERROR_MSG = 'Não possui 7 dígitos';

  userPermission: boolean;
  
  siape: string;
  name: string;
  nickname: string;
  dataSource: MatTableDataSource<JSON>;
  @ViewChild('addProfessorForm') form;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private profDmService: ProfessorsDmService,
    private snackBar: MatSnackBar,
    private dialogService: DialogService,
    private router: Router,
    private aAuth: AuthService
  ) { }

  ngOnInit() {
    this.profDmService.getProfessors().subscribe( professors => {
      this.dataSource = new MatTableDataSource<JSON>(professors);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })

    this.isAdmin();
  }

  siapeControl = new FormControl('', [Validators.required, Validators.maxLength(7), Validators.pattern("[0-9]")]);
  nameControl = new FormControl('', [Validators.required]);
  nicknameControl =  new FormControl('', [Validators.required]);

  // Só funciona se o erro for required. Não funciona para os outros tipos de erros. Investigar esta merda.
  getErrorMessage(control: FormControl) {
    return control.hasError('required') ? AddProfessorComponent.REQUIRED_FIELD_ERROR_MSG :
           control.hasError('minlength') ? AddProfessorComponent.MIN_LENGTH_ERROR_MSG : 
            '';
  }
  
  saveProfessor() {
    let professor = new Professor(this.siape, this.name, this.nickname);

    this.profDmService.existChild('siape', this.siape).then( (exists) => {
      if (exists) { 
        this.snackBar.open("Esse professor (siape) já foi cadastrado", null, {duration: 2500});
      } else {
        this.profDmService.existChild("nickname", this.nickname).then( (exists) => {
          if (exists) {
            this.snackBar.open("Esse apelido já existe", null, {duration: 2500});      
          } else {
            this.profDmService.saveProfessor(professor)
            this.snackBar.open("Professor cadastrado com sucesso", null, {duration: 2500});
            this.form.resetForm();
          }
        })
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  deleteProfessor(professor: Professor, firebaseId: string) {
    var title = "Excluir Professor";
    var message = "Todas as informações de "+professor.nickname+" serão apagadas";
    var posAct = "Excluir";
    var negAct = "Cancelar";
    var noException = true;
    this.dialogService.openDialog(title, message, posAct, negAct).subscribe( (result) => {
      if (result) {
        this.profDmService.deleteProfessor(firebaseId).catch(() => {
          this.snackBar.open("Desculpe. Não foi possível excluir o professor.", null, {duration: 2500});      
          noException = false;
        });
        if(noException){
          this.snackBar.open("Professor excluído com sucesso", null, {duration: 2500});      
        }
      }
    })   
  }

  redirectToEdition(professorId: string) {
    this.router.navigateByUrl('edit_professor/'+professorId);
  }

  redirectToRestrictions(professorId: string) {
    this.router.navigateByUrl('prof_restriction/'+professorId);
  }

  isAdmin(){
    return this.aAuth.getCurrentBinaryPermission().then(
      binPerm => {
        if(binPerm == 1){
          this.userPermission = true;
        }else if(binPerm == 0){
          this.userPermission = false;
    }
      }
    )
  }
}
