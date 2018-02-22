import { Component, OnInit, ViewChild } from '@angular/core';
import { Request } from '../request.model';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { RequestsDmService } from '../../data-manager/requests/requests-dm.service';
import { UsersDmService } from '../../data-manager/users/users-dm.service';
import { User } from '../../users/user';
import { DialogService } from "../../dialog-service/dialog.service";

@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.css']
})
export class ViewRequestsComponent implements OnInit {

  siape: string;
  name: string;
  email: string;
  reqList: JSON[];
  dataSource: MatTableDataSource<JSON>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private snackbarService: MatSnackBar,
    private requestsDmService: RequestsDmService,
    private usersDmService: UsersDmService,
    private dialogService: DialogService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.requestsDmService.getRequests().subscribe( requests => {
      this.reqList = requests;
      this.dataSource = new MatTableDataSource<JSON>(requests);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  acceptRequest(requestID: string){
    this.requestsDmService.getRequestById(requestID).valueChanges().subscribe( request => {
      this.siape = request.siape;
      this.name = request.name;
      this.email = request.email;

      let user = new User (this.siape,this.name,0,this.email);

      this.usersDmService.saveUser(user);
      this.requestsDmService.deleteRequest(requestID);
    })
  }

  deleteRequest(request: Request, requestID){
    var title = "Excluir Requisição";
    var message = "Todas as informações de "+request.name+" serão apagadas";
    var posAct = "Excluir";
    var negAct = "Cancelar";
    this.dialogService.openDialog(title, message, posAct, negAct).subscribe( (result) => {
      if (result) {
        this.requestsDmService.deleteRequest(requestID).catch(() => {
          this.snackBar.open("Desculpe. Não foi possível excluir a requisição.", null, {duration: 2500});      
        });
      }
    })
  }

  requestsExist(){
    if(this.reqList.length>0){
      return true;
    }else{
      return false;
    }
  }

}
