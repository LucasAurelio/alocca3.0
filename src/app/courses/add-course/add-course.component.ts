import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'; 
import { Course } from '../course'
import { CoursesDmService } from '../../data-manager/courses/courses-dm.service'
import { MatSnackBar, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DialogService } from "../../dialog-service/dialog.service"
import { Router } from '@angular/router'

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  static readonly  REQUIRED_FIELD_ERROR_MSG = 'Campo obrigatório';

  code: string;
  name: string;
  shortname: string;
  credits: number;
  offererDepartment: string;
  requesterDepartment: string;
  type: string;
  recommendedSemester: number;
  minRecSemester: number;
  maxRecSemester: number;

  departments = ['UASC', 'outro']
  courseTypes = ['Complementar', 'Eletiva', 'Obrigatória', 'Optativa']
  semesters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  dataSource: MatTableDataSource<JSON>;
  coursesList: JSON[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('addCourseForm') form;

  constructor(
    private coursesDmService: CoursesDmService,
    private snackBar: MatSnackBar,
    private dialogService: DialogService,
    private router: Router
  ) { }

  ngOnInit() {
    this.coursesDmService.getCourses().subscribe( courses => {
      this.coursesList = courses;
      this.dataSource = new MatTableDataSource<JSON>(courses);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  codeControl = new FormControl('', [Validators.required]);
  nameControl = new FormControl('', [Validators.required]);
  shortnameControl = new FormControl('', [Validators.required]);
  creditsControl = new FormControl('', [Validators.required]);
  offererDepControl = new FormControl('', [Validators.required]);
  requesterDepControl = new FormControl('', [Validators.required]);
  typeControl = new FormControl('', [Validators.required]);
  recSemControl = new FormControl('', [Validators.required]);
  minRecSemControl = new FormControl('', [Validators.required]);
  maxRecSemControl = new FormControl('', [Validators.required]);
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  formatSemesters(minSemester: number, maxSemester: number) {
    if (minSemester == maxSemester) {
      return minSemester + "º"
    } else {
      return minSemester + "º - " + maxSemester + "º"  
    }
  }
  
  // Só funciona se o erro for required. Não funciona para os outros tipos de erros. Investigar esta merda.
  getErrorMessage(control: FormControl) {
    return control.hasError('required') ? AddCourseComponent.REQUIRED_FIELD_ERROR_MSG :
            '';
  }

  redirectToEdition(courseId: string) {
    this.router.navigateByUrl('edit_course/'+courseId);
  }

  saveCourse() {
    if (this.type == "Optativa") {
      var minSemester = this.minRecSemester;
      var maxSemester = this.maxRecSemester;
    } else {
      var minSemester = this.recommendedSemester;
      var maxSemester = this.recommendedSemester;
    }

    let course = new Course(this.code, this.name, this.shortname, this.credits,
                            this.offererDepartment, this.requesterDepartment, 
                            this.type, minSemester, maxSemester)

    this.coursesDmService.existChild('code', this.code).then((exists) => {
      if (exists) {
        this.snackBar.open("Esse código já foi cadastrado", null, {duration: 2500});
      } else {
        this.coursesDmService.existChild('name', this.name).then((exists) => {
          if (exists) {
            this.snackBar.open("Esse nome já foi cadastrado", null, {duration: 2500});            
          } else {
            this.coursesDmService.existChild('shortname', this.shortname).then((exists) => {
              if (exists) {
                this.snackBar.open("Esse nome curto já foi cadastrado", null, {duration: 2500});            
              } else {
                this.coursesDmService.saveCourse(course);
                this.snackBar.open("Disciplina cadastrada com sucesso", null, {duration: 2500});
                this.form.resetForm();
              }
            })
          }
        })
      }
    })
  }

  deleteCourse(course: Course, firebaseId: string) {
    var title = "Excluir Disciplina";
    var message = "Todas as informações de "+course.shortname+" serão apagadas";
    var posAct = "Excluir";
    var negAct = "Cancelar";
    var noException = true;
    this.dialogService.openDialog(title, message, posAct, negAct).subscribe( (result) => {
      if (result) {
        this.coursesDmService.deleteCourse(firebaseId).catch(() => {
          this.snackBar.open("Desculpe. Não foi possível excluir a disciplina.", null, {duration: 2500});      
          noException = false;
        });
        if(noException){
          this.snackBar.open("Disciplina excluída com sucesso", null, {duration: 2500});
        }

      }
    })   
  }


}
