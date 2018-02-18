import { Component, OnInit } from '@angular/core';
import { Request } from '../request.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { RequestsDmService } from '../../data-manager/requests/requests-dm.service';

@Component({
  selector: 'app-request-access',
  templateUrl: './request-access.component.html',
  styleUrls: ['./request-access.component.css']
})
export class RequestAccessComponent implements OnInit {

  ngOnInit(){}

  constructor(
    private reqDmService: RequestsDmService,
    private router: Router,
    private snackbarService: MatSnackBar
  ) { }

  onAddNewRequest(){

  }

}
