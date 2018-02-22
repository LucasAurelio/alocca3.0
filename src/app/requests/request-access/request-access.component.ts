import { Component, OnInit } from '@angular/core';
import { Request } from '../request.model';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { RequestsDmService } from '../../data-manager/requests/requests-dm.service';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-request-access',
  templateUrl: './request-access.component.html',
  styleUrls: ['./request-access.component.css']
})
export class RequestAccessComponent implements OnInit {

  classForm = new FormGroup ({
    siape: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl()
  });

  ngOnInit(){
  }

  constructor(
    private router: Router,
    private snackbarService: MatSnackBar,
    private authService: AuthService,
    private requestsDmService: RequestsDmService
  ) { }

  onAddNewRequest(){
    var siape = this.classForm.controls.siape.value;
    var name = this.classForm.controls.name.value;
    var email = this.classForm.controls.email.value;

    let request_ = new Request(
      siape,
      name,
      email
    );

    var exists = this.requestsDmService.existRequest(request_, siape);

    this.requestsDmService.saveRequest(request_);

    this.classForm.reset();
    this.snackbarService.open("Seu pedido foi cadastrado com sucesso!", null, {duration: 2500});
    this.router.navigateByUrl('/');
  }

  back(){
    this.router.navigateByUrl('/');
  }

}
