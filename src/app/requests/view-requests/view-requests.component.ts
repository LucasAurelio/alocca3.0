import { Component, OnInit, ViewChild } from '@angular/core';
import { Request } from '../request.model';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { RequestsDmService } from '../../data-manager/requests/requests-dm.service';

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
    private requestsDmService: RequestsDmService
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

}
