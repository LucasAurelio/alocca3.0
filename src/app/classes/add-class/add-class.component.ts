import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CoursesDmService } from '../../data-manager/courses/courses-dm.service'
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { ProfessorsDmService } from '../../data-manager/professors/professors-dm.service'
import { SemesterService } from '../../semesters/semester.service'
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

  static readonly  REQUIRED_FIELD_ERROR_MSG = 'Campo obrigatório';

  semesterKey: string;

  courseControl: FormControl = new FormControl('', [Validators.required]);
  professor1Control: FormControl = new FormControl('', [Validators.required]);
  professor2Control: FormControl = new FormControl();  

  filteredCourses: Observable<any[]>;
  filteredProfessors1: Observable<any[]>;
  filteredProfessors2: Observable<any[]>;  

  coursesList: any[];
  professorsList: any[];

  constructor(
    private coursesDmService: CoursesDmService,
    private profDmService: ProfessorsDmService,
    private semesterService: SemesterService,
    private snackBar: MatSnackBar
  ) {   }

  ngOnInit() {
    /* Recupera a lista de disciplinas e conecta ao autocompletar juntamente com um filtro*/
    this.coursesDmService.getCourses().subscribe(courses => {
      this.coursesList = courses;

      this.filteredCourses = this.courseControl.valueChanges.pipe(
        startWith(''),
        map(val => this.coursesList.filter(course =>
          course.shortname.toLowerCase().indexOf(val.toLowerCase()) === 0))
      );
    });

    /* Recupera a lista de professores e conecta ao autocompletar juntamente com um filtro*/
    this.profDmService.getProfessors().subscribe( professors => {
      this.professorsList = professors;

      this.filteredProfessors1 = this.professor1Control.valueChanges.pipe(
        startWith(''),
        map(val => this.professorsList.filter(prof =>
          prof.nickname.toLowerCase().indexOf(val.toLowerCase()) === 0))
      )

      this.filteredProfessors2 = this.professor2Control.valueChanges.pipe(
        startWith(''),
        map(val => this.professorsList.filter(prof =>
          prof.nickname.toLowerCase().indexOf(val.toLowerCase()) === 0))
      )
    })

    /* Muda a variável de semestre sempre que o semestre mudar na navbar*/
    this.semesterService.getSemesterEmitter().subscribe(semesterKey => {
      this.semesterKey = semesterKey;
    })
    this.semesterService.reemitSemester();

  }

  saveClass() {
    // Verifica se as entradas estão nas respectivas lista de disciplinas e professores
    var isCourseValid = this.coursesList.map(course => course.shortname).includes(this.courseControl.value)
                        || this.courseControl.value == "" || this.courseControl.value == null;
    var isProf1Valid = this.professorsList.map(prof => prof.nickname).includes(this.professor1Control.value)
                       || this.professor1Control.value == "" || this.professor1Control.value == null;
    var isProf2Valid = this.professorsList.map(prof => prof.nickname).includes(this.professor2Control.value)
                       || this.professor2Control.value == "" || this.professor2Control.value == null;

    if (!isCourseValid) {
      this.snackBar.open("Disciplina inválida. Selecione uma disciplina já cadastrada.", null, {duration: 3000});
      return;
    }

    if (!isProf1Valid) {
      this.snackBar.open("Professor 1 inválido. Selecione um professor já cadastrado.", null, {duration: 3000});
      return;
    }

    if (!isProf2Valid) {
      this.snackBar.open("Professor 2 inválido. Selecione um professor já cadastrado.", null, {duration: 3000});
      return;
    }

    
  }


}
