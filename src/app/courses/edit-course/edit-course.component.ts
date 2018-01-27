import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Course } from '../course'
import { CoursesDmService } from '../../data-manager/courses/courses-dm.service'
import { MatSnackBar, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  static readonly  REQUIRED_FIELD_ERROR_MSG = 'Campo obrigatório';

  id: string;

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

  originalCode: string;
  originalName: string;
  originalShortname: string;

  departments = ['UASC', 'outro']
  courseTypes = ['Complementar', 'Eletiva', 'Obrigatória', 'Optativa']
  semesters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  constructor( 
    private coursesDmService: CoursesDmService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() { 
    this.id = this.activatedRoute.snapshot.params['id']
    this.coursesDmService.getCourseById(this.id).valueChanges().subscribe( course => {
        this.code = course.code;
        this.name = course.name;
        this.shortname = course.shortname;
        this.credits = course.credits;
        this.offererDepartment = course.offererDepartment;
        this.requesterDepartment = course.requesterDepartment;
        this.type = course.type;
        this.recommendedSemester = course.minimumSemester;
        this.minRecSemester = course.minimumSemester;
        this.maxRecSemester = course.maximumSemester;

        this.originalCode = course.code;
        this.originalName = course.name;
        this.originalShortname = course.shortname;
    });
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

  // Só funciona se o erro for required. Não funciona para os outros tipos de erros. Investigar esta merda.
  getErrorMessage(control: FormControl) {
  return control.hasError('required') ? EditCourseComponent.REQUIRED_FIELD_ERROR_MSG :
          '';
  }

  saveInformation() {
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
      if (exists && this.code != this.originalCode) {
        this.snackBar.open("Esse código já foi cadastrado", null, {duration: 2500});
      } else {
        this.coursesDmService.existChild('name', this.name).then((exists) => {
          if (exists && this.name != this.originalName) {
            this.snackBar.open("Esse nome já foi cadastrado", null, {duration: 2500});            
          } else {
            this.coursesDmService.existChild('shortname', this.shortname).then((exists) => {
              if (exists && this.shortname != this.originalShortname) {
                this.snackBar.open("Esse nome curto já existe", null, {duration: 2500});            
              } else {
                this.coursesDmService.updateCourse(course, this.id);
                this.snackBar.open("Informações atuaizadas", null, {duration: 2500});
                this.router.navigateByUrl('courses');
              }
            })
          }
        })
      }
    })
  }
}
