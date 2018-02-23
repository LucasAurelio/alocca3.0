import {Component} from '@angular/core';
import { Schedule } from '../schedule.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { RequestsDmService } from '../../data-manager/requests/requests-dm.service';
import {MatTableDataSource} from '@angular/material';

/**
 * @title Basic table
 */
@Component({
  selector: 'schedules-table',
  styleUrls: ['schedules-table.component.css'],
  templateUrl: 'schedules-table.component.html',
})

export class SchedulesTableComponent {
  displayedColumns = ['horario', 'segunda', 'terca', 'quarta', 'quinta', 'sexta'];
  dataSource = new MatTableDataSource(TABLE_DATA);

  opened: boolean;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

export interface Table {
  horario: number;
  segunda: string;
  terca: string;
  quarta: string;
  quinta: string;
  sexta: string;
}

const TABLE_DATA: Table[] = [
  {horario: 7, segunda: 'Hydrogen', terca: 'aula', quarta: 'aula', quinta: 'algo', sexta: 'algo tb'},
  {horario: 8, segunda: 'Helium', terca: 'aula', quarta: 'aula', quinta: 'algo', sexta: 'algo tb'},
  {horario: 10, segunda: 'Lithium', terca: 'aula', quarta: 'aula', quinta: 'algo', sexta: 'algo tb'},
  {horario: 14, segunda: 'Beryllium', terca: 'aula', quarta: 'aula', quinta: 'algo', sexta: 'algo tb'},
  {horario: 16, segunda: 'Boron', terca: 'aula', quarta: 'aula', quinta: 'algo', sexta: 'algo tb'},
  {horario: 18, segunda: 'Carbon', terca: 'aula', quarta: 'aula', quinta: 'algo', sexta: 'algo tb'},
  {horario: 20, segunda: 'Nitrogen', terca: 'aula', quarta: 'aula',quinta: 'algo', sexta: 'algo tb'},
];
