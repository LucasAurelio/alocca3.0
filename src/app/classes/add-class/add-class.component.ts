import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CoursesDmService } from '../../data-manager/courses/courses-dm.service'
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { ProfessorsDmService } from '../../data-manager/professors/professors-dm.service'
import { SemesterService } from '../../semesters/semester.service'
import { MatSnackBar } from '@angular/material';
import { ClassesDmService } from '../../data-manager/classes/classes-dm.service'
import { Course } from '../../courses/course'
import { Professor } from '../../professors/professor'
import { Class } from '../class'

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

  static readonly  REQUIRED_FIELD_ERROR_MSG = 'Campo obrigatório';

  semesterKey: string;

  classForm = new FormGroup ({
    courseControl: new FormControl('', [Validators.required]),
    professor1Control: new FormControl('', [Validators.required]),
    professor2Control: new FormControl()
  });

  filteredCourses: Observable<any[]>;
  filteredProfessors1: Observable<any[]>;
  filteredProfessors2: Observable<any[]>;  

  coursesList: any[];
  professorsList: any[];

  constructor(
    private coursesDmService: CoursesDmService,
    private profDmService: ProfessorsDmService,
    private semesterService: SemesterService,
    private snackBar: MatSnackBar,
    private classesDmService: ClassesDmService
  ) {   }

  ngOnInit() {
    var controls = this.classForm.controls;
    /* Recupera a lista de disciplinas e a conecta ao autocompletar juntamente com um filtro*/
    this.coursesDmService.getCourses().subscribe(courses => {
      this.coursesList = courses;

      this.filteredCourses = controls.courseControl.valueChanges.pipe(
        startWith<string | Course>(''),
        map(value => typeof value === 'string' ? value : value.shortname),
        map(shortname => shortname ? this.coursesList.filter(course =>
          course.shortname.toLowerCase().indexOf(shortname.toLowerCase()) === 0) : this.coursesList.slice())
      );
    });

    /* Recupera a lista de professores e conecta ao autocompletar juntamente com um filtro*/
    this.profDmService.getProfessors().subscribe( professors => {
      this.professorsList = professors;

      this.filteredProfessors1 = controls.professor1Control.valueChanges.pipe(
        startWith<string | Professor>(''),
        map(value => typeof value === 'string' ? value : value.nickname),
        map(nickname => nickname ? this.professorsList.filter(prof =>
          prof.nickname.toLowerCase().indexOf(nickname.toLowerCase()) === 0): this.professorsList.slice())
      )

      this.filteredProfessors2 = controls.professor2Control.valueChanges.pipe(
        startWith<string | Professor>(''),
        map(value => typeof value === 'string' ? value : value.nickname),
        map(nickname => nickname ? this.professorsList.filter(prof =>
          prof.nickname.toLowerCase().indexOf(nickname.toLowerCase()) === 0): this.professorsList.slice())
      )
    })

    /* Muda a variável de semestre sempre que o semestre mudar na navbar*/
    this.semesterService.getSemesterEmitter().subscribe(semesterKey => {
      this.semesterKey = semesterKey;
    })
    this.semesterService.reemitSemester();

  }

  saveClass() {
    var controls = this.classForm.controls
    var courseShortname = controls.courseControl. //this.course.shortname: undefined;
    // var prof1Nickname = this.professor1? this.professor1.nickname: undefined;
    // var prof2Nickname = this.professor2? this.professor2.nickname: undefined;

    console.log(courseShortname);

    // Verifica se as entradas estão nas respectivas lista de disciplinas e professores
    var isCourseValid = courseShortname? this.coursesList.map(course => course.shortname).includes(courseShortname) : false; 
    // var isProf1Valid = prof1Nickname? this.professorsList.map(prof => prof.nickname).includes(prof1Nickname) : false;
    // var isProf2Valid = prof2Nickname? this.professorsList.map(prof => prof.nickname).includes(prof2Nickname) : false;

    if (!isCourseValid) {
      this.snackBar.open("Disciplina inválida. Selecione uma disciplina já cadastrada.", null, {duration: 3000});
      return;
    }

    // if (!isProf1Valid) {
    //   this.snackBar.open("Professor 1 inválido. Selecione um professor já cadastrado.", null, {duration: 3000});
    //   return;
    // }

    // if (!isProf2Valid) {
    //   this.snackBar.open("Professor 2 inválido. Selecione um professor já cadastrado.", null, {duration: 3000});
    //   return;
    // }

    let class_ = new Class(
      this.semesterKey,
      this.classForm.controls.courseControl.value.key,
      1,
      this.classForm.controls.professor1Control.value.key,
      this.classForm.controls.professor2Control.value? this.classForm.controls.professor2Control.value.key : null 
    )

    // this.classesDmService.saveClass(class_);

    // this.classesDmService.getNumberOfClasses(this.semesterKey, this.courseControl.value.key).then(
    //   result => { console.log(result); }
    // )
    
  }

  displayCourse(course?: any): string | undefined {
    return course ? course.shortname : undefined;
  }

  displayProfessor(professor?: any): string | undefined {
    return professor ? professor.nickname : undefined;
  }

}
