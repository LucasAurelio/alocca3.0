import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../user';
import { UserPermission } from '../permission';
import { UsersDmService } from '../../data-manager/users/users-dm.service';
import { MatSnackBar, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DialogService } from "../../dialog-service/dialog.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {

  static readonly  REQUIRED_FIELD_ERROR_MSG = 'Campo obrigatório';
  static readonly  MIN_LENGTH_ERROR_MSG = 'Não possui 7 dígitos';

  siape: string;
  name: string;
  permissionOptions: string[];
  permission: string;
  permissionValue: number;
  email: string;
  usersList: JSON[];
  dataSource: MatTableDataSource<JSON>;
  @ViewChild('addUserForm') form;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private userDmService: UsersDmService,
    private snackBar: MatSnackBar,
    private dialogService: DialogService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userDmService.getUsers().subscribe( users => {
      this.usersList = users;
      this.dataSource = new MatTableDataSource<JSON>(users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })

    var options = Object.keys(UserPermission);
    this.permissionOptions = options.slice(options.length/2);
  }

  siapeControl = new FormControl('', [Validators.required, Validators.maxLength(7), Validators.pattern("[0-9]")]);
  nameControl = new FormControl('', [Validators.required]);
  permissionControl =  new FormControl('', [Validators.required]);
  emailControl = new FormControl('',Validators.required);

  // Só funciona se o erro for required. Não funciona para os outros tipos de erros. Investigar esta merda.
  getErrorMessage(control: FormControl) {
    return control.hasError('required') ? AddUserComponent.REQUIRED_FIELD_ERROR_MSG :
           control.hasError('minlength') ? AddUserComponent.MIN_LENGTH_ERROR_MSG : 
            '';
  }

  parsePermissionValue(){
    this.permissionValue = UserPermission[this.permission];
  }

  parsePermissionString(permissionValue){
    if(permissionValue == 1){
      return "Admin";
    }else{
      return "Default"
    }
  }
  
  saveUser() {
    let user = new User(this.siape, this.name, this.permissionValue, this.email);

    this.userDmService.existChild('siape', this.siape).then( (exists) => {
      if (exists) { 
        this.snackBar.open("Esse usuário (SIAP) já foi cadastrado", null, {duration: 2500});
      } else {
        this.userDmService.existChild("email", this.email).then( (exists) => {
          if (exists) {
            this.snackBar.open("Esse email já foi cadastrado", null, {duration: 2500});      
          } else {
            this.userDmService.saveUser(user)
            this.snackBar.open("Usuário cadastrado com sucesso", null, {duration: 2500});
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

  deleteUser(user: User, firebaseId: string) {
    var title = "Excluir Usuário";
    var message = "Todas as informações de "+user.name+" serão apagadas";
    var posAct = "Excluir";
    var negAct = "Cancelar";
    this.dialogService.openDialog(title, message, posAct, negAct).subscribe( (result) => {
      if (result) {
        this.userDmService.deleteUser(firebaseId).catch(() => {
          this.snackBar.open("Desculpe. Não foi possível excluir o usuário.", null, {duration: 2500});      
        });
      }
    })   
  }

  redirectToEdition(userId: string) {
    this.router.navigateByUrl('edit_user/'+userId);
  }
}
