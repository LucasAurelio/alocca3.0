import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { UsersDmService } from '../../data-manager/users/users-dm.service';
import { User } from '../user'
import { MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { UserPermission } from '../permission';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  static readonly  REQUIRED_FIELD_ERROR_MSG = 'Campo obrigatório';
  static readonly  MIN_LENGTH_ERROR_MSG = 'Não possui 7 dígitos';

  id: string;
  siape: string;
  name: string;
  permissionOptions: string[];
  permissionValue: number;
  permission: string;
  email: string;
  originalSiape: string;
  originalEmail: string;

  constructor(
    private userDmService: UsersDmService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router 
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id']
    this.userDmService.getUserById(this.id).valueChanges().subscribe( user => {
        this.siape = user.siape;
        this.name = user.name;
        this.permissionValue = user.permission;
        this.email = user.email;
        this.originalSiape = user.siape;
        this.originalEmail = user.email;

        this.parsePermissionString(this.permissionValue);
    });

    var options = Object.keys(UserPermission);
    this.permissionOptions = options.slice(options.length/2);
  }

  siapeControl = new FormControl('', [Validators.required, Validators.maxLength(7), Validators.pattern("[0-9]")]);
  nameControl = new FormControl('', [Validators.required]);
  permissionControl =  new FormControl('', [Validators.required]);
  emailControl = new FormControl('',Validators.required);

  // Só funciona se o erro for required. Não funciona para os outros tipos de erros. Investigar esta merda.
  getErrorMessage(control: FormControl) {
    return control.hasError('required') ? EditUserComponent.REQUIRED_FIELD_ERROR_MSG :
           control.hasError('minlength') ? EditUserComponent.MIN_LENGTH_ERROR_MSG : 
            '';
  }

  parsePermissionValue(){
    this.permissionValue = UserPermission[this.permission];
  }

  parsePermissionString(permissionValue){
    if(permissionValue == 1){
      this.permission = "Admin";
    }else{
      this.permission = "Default"
    }
  }

  saveInformation() {
    let user = new User(this.siape, this.name, this.permissionValue, this.email);
    
    this.userDmService.existChild('siape', this.siape).then( (exists) => {
      if (exists && this.siape != this.originalSiape) { 
        this.snackBar.open("Esse usuário (SIAPE) já foi cadastrado", null, {duration: 2500});
      } else {
        this.userDmService.existChild("email", this.email).then( (exists) => {
          if (exists && this.email!= this.originalEmail) {
            this.snackBar.open("Esse email já foi cadastrado", null, {duration: 2500});      
          } else {
            this.userDmService.updateUser(user, this.id);
            this.snackBar.open("Informações atualizadas", null, {duration: 2500});
            this.router.navigateByUrl('users');
          }
        })
      }
    })
  }
}
