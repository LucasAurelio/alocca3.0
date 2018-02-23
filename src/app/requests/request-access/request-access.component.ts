import { Component, OnInit, ViewChild } from '@angular/core';
import { Request } from '../request.model';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { RequestsDmService } from '../../data-manager/requests/requests-dm.service';
import { UsersDmService } from "../../data-manager/users/users-dm.service";
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-request-access',
  templateUrl: './request-access.component.html',
  styleUrls: ['./request-access.component.css']
})
export class RequestAccessComponent implements OnInit {

  static readonly  REQUIRED_FIELD_ERROR_MSG = 'Campo obrigatório';
  static readonly  MIN_LENGTH_ERROR_MSG = 'Não possui 7 dígitos';

  siape:string;
  name:string;
  email:string;
  @ViewChild('addRequestForm') form;

  constructor(
    private router: Router,
    private snackbarService: MatSnackBar,
    private authService: AuthService,
    private requestsDmService: RequestsDmService,
    private usersDmService: UsersDmService
  ) { }

  ngOnInit(){
  }

  siapeControl = new FormControl('', [Validators.required, Validators.maxLength(7), Validators.pattern("[0-9]")]);
  nameControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.pattern("[A-Za-z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+")]);

  getErrorMessage(control: FormControl) {
    return control.hasError('required') ? RequestAccessComponent.REQUIRED_FIELD_ERROR_MSG :
           control.hasError('minlength') ? RequestAccessComponent.MIN_LENGTH_ERROR_MSG : 
            '';
  }

  addNewRequest(){

    let request = new Request(this.siape, this.name, this.email);

    this.requestsDmService.existChild('email', this.email).then( (exists) => {
      if(exists){
        this.snackbarService.open("Já existe um pedido de acesso para esse email.", null, {duration: 2500});
      }else{
        this.usersDmService.existChild('email', this.email).then( (exists) => {
          if(exists){
            this.snackbarService.open("Você já está cadastrado. Tente fazer login.", null, {duration: 2500});
            this.router.navigateByUrl('/');
          }else{
            this.requestsDmService.saveRequest(request);
            this.form.resetForm();
            this.snackbarService.open("Seu pedido foi cadastrado com sucesso!", null, {duration: 2500});
            this.router.navigateByUrl('/');
          }
        })
      }
    })
  }

  back(){
    this.router.navigateByUrl('/');
  }

}
