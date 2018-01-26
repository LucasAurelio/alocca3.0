import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Professor } from '../professor'
import { ProfessorsDmService } from '../../data-manager/professors/professors-dm.service';
import { MatSnackBar, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DialogService } from "../../dialog-service/dialog.service"

@Component({
  selector: 'app-add-professor',
  templateUrl: './add-professor.component.html',
  styleUrls: ['./add-professor.component.css']
})

export class AddProfessorComponent implements OnInit {

  static readonly  REQUIRED_FIELD_ERROR_MSG = 'Campo obrigatório';
  static readonly  MIN_LENGTH_ERROR_MSG = 'Não possui 7 dígitos';

  siap: string;
  name: string;
  nickname: string;
  professorsList: JSON[];
  dataSource: MatTableDataSource<JSON>;
  @ViewChild('addProfessorForm') form;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private profDmService: ProfessorsDmService,
    private snackBar: MatSnackBar,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.profDmService.getProfessors().valueChanges().subscribe( professors => {
      this.professorsList = professors;
      this.dataSource = new MatTableDataSource<JSON>(professors);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  siapControl = new FormControl('', [Validators.required, Validators.maxLength(7), Validators.pattern("[0-9]")]);
  nameControl = new FormControl('', [Validators.required]);
  nicknameControl =  new FormControl('', [Validators.required]);

  // Só funciona se o erro for required. Não funciona para os outros tipos de erros. Investigar esta merda.
  getErrorMessage(control: FormControl) {
    return control.hasError('required') ? AddProfessorComponent.REQUIRED_FIELD_ERROR_MSG :
           control.hasError('minlength') ? AddProfessorComponent.MIN_LENGTH_ERROR_MSG : 
            '';
  }
  
  saveProfessor() {
    let professor = new Professor(this.siap, this.name, this.nickname);

    this.profDmService.existProfessor(professor).then( (exists) => {
      if (exists) { 
        this.snackBar.open("Esse professor (SIAP) já foi cadastrado.", null, {duration: 2500});
        this.form.resetForm();
      } else {
        this.profDmService.existsChild("nickname", this.nickname).then( (exists) => {
          if (exists) {
            this.snackBar.open("Esse apelido já existe.", null, {duration: 2500});
            this.form.resetForm();        
          } else {
            this.profDmService.saveProfessor(professor).then(() => {
              this.snackBar.open("Professor cadastrado com sucesso.", null, {duration: 2500});
              this.form.resetForm();
            }).catch((error) => {
              this.snackBar.open("Desculpe. Não foi possível cadastrar o professor.", null, {duration: 2500});
              this.form.resetForm();
            });
          }
        })
      }
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  deleteProfessor(professor: Professor) {
    var title = "Excluir Professor";
    var message = "Todas as informações de "+professor.nickname+" serão apagadas";
    var posAct = "Excluir";
    var negAct = "Cancelar";
    this.dialogService.openDialog(title, message, posAct, negAct).subscribe( (result) => {
      if (result) {
        this.profDmService.deleteProfessor(professor.siap).catch(() => {
          this.snackBar.open("Desculpe. Não foi possível apagar o professor.", null, {duration: 2500});      
        });
      }
    })   
  }
}
