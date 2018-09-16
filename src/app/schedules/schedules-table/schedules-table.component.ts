import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ClassesDmService } from '../../data-manager/classes/classes-dm.service';
import { MatSnackBar, MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { DialogService } from "../../dialog-service/dialog.service";
import { Router } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';
import { SemesterService } from '../../semesters/semester.service';

@Component({
  selector: 'app-schedules-table',
  templateUrl: './schedules-table.component.html',
  styleUrls: ['./schedules-table.component.css']
})
export class SchedulesTableComponent implements OnInit {
  static readonly  REQUIRED_FIELD_ERROR_MSG = 'Campo obrigatório';
  
  displayedColumnsMainTable = ["time","monday", "tuesday", "wednesday", "thursday", "friday"];
  DAYS =  ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
  HOURS = [7,8,10,12,14,16,18,20];
  dataSourceMainTable = new MatTableDataSource(WEEK_HOURS);

  userPermission: boolean;

  opened: boolean;

  classesList: any[];
  classesFiltered: any[];

  semesterKey: string;
  
  class: any;
  day: string;
  hour: number;
  @ViewChild('scheduleClassForm') form;
  dataSourceClasses: MatTableDataSource<JSON>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  classControl = new FormControl('', [Validators.required]);
  dayControl = new FormControl('', [Validators.required]);
  hourControl =  new FormControl('', [Validators.required]);

  // Filtros
  semesters: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  courseTypes = ['Complementar', 'Eletiva', 'Obrigatória', 'Optativa']
  filteredSemester: number;
  filteredType: string;
  
  constructor(
    private classesDmService: ClassesDmService,
    private snackBar: MatSnackBar,
    private dialogService: DialogService,
    private semesterService: SemesterService,
    private router: Router,
    private aAuth: AuthService
  ) { }

  ngOnInit() {

    this.isAdmin();

    this.semesterService.getSemesterEmitter().subscribe(semesterKey => {
      this.semesterKey = semesterKey;

      this.classesDmService.getClasses().subscribe( classes => {
        this.classesList = classes;
        this.classesFiltered = classes;
        this.dataSourceClasses = new MatTableDataSource(classes);
        console.dir(this.dataSourceClasses);
        this.dataSourceClasses.sort = this.sort;
        this.dataSourceClasses.paginator = this.paginator;
      });

    });
    
    this.semesterService.reemitSemester();
  }

  // Filtros de semestre e tipo de disciplina
  applyFilters() {
    if (this.filteredSemester && this.filteredType) {
      this.classesFiltered = this.classesList.filter(class_ => class_.courseSemester == this.filteredSemester && 
        class_.courseType == this.filteredType);
    } else  if (this.filteredSemester) {
      this.classesFiltered = this.classesList.filter(class_ => class_.courseSemester == this.filteredSemester);
    } else if (this.filteredType) {
      this.classesFiltered = this.classesList.filter(class_ => class_.courseType == this.filteredType);
    } else {
      this.classesFiltered = this.classesList;
    }
  }

  checkHours(class_, row){
    var hours: any[] = class_.schedule.monday.hours;
    return hours;
  }

  getErrorMessage(control: FormControl) {
    return control.hasError('required') ? SchedulesTableComponent.REQUIRED_FIELD_ERROR_MSG :
            '';
  }

  displayClass(clas?: any): string | undefined {
    return clas ? clas.courseName+" - "+clas.number : undefined;
  } 

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourceMainTable.filter = filterValue;
  }
  
  scheduleClass() {

    this.classesDmService.scheduleClass(this.class.key,this.day,this.hour)
    this.snackBar.open("Horário definido com sucesso", null, {duration: 2500});
    this.form.resetForm();
  }
  
  deleteClassSchedule(class_,day,hour) {
    var title = "Remover horário";
    var message = "será desalocada";
    var posAct = "Excluir";
    var negAct = "Cancelar";
    //var noException = true;
    this.dialogService.openDialog(title, message, posAct, negAct).subscribe( (result) => {
      if (result) {
        this.classesDmService.removeClassFromSchedule(class_,day,hour)
        //.catch(() => {
        this.snackBar.open("Turma desalocada com sucesso", null, {duration: 2500});      
        //this.snackBar.open("Desculpe. Não foi possível desalocar a turma", null, {duration: 2500});      
          //noException = false;
        //});
        //if(noException){
        //this.snackBar.open("Turma desalocada com sucesso", null, {duration: 2500});      
       // }
      }
    })   
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

export interface Hour {
  hour: number;
}

const WEEK_HOURS: Hour[] = [
  {hour: 7},
  {hour: 8},
  {hour: 10},
  {hour: 12},
  {hour: 14},
  {hour: 16},
  {hour: 18},
  {hour: 20}
];
