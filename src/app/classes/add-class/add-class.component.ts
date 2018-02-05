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
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.coursesList.filter(course =>
          course.name.toLowerCase().indexOf(name.toLowerCase()) === 0) : this.coursesList.slice())
      );
    });

    /* Recupera a lista de professores e conecta ao autocompletar juntamente com um filtro*/
    this.profDmService.getProfessors().subscribe( professors => {
      this.professorsList = professors;

      this.filteredProfessors1 = controls.professor1Control.valueChanges.pipe(
        startWith<string | Professor>(''),
        map(value => typeof value === 'string' ? value : value.nickname),
        map(name => name ? this.professorsList.filter(prof =>
          prof.name.toLowerCase().indexOf(name.toLowerCase()) === 0): this.professorsList.slice())
      )

      this.filteredProfessors2 = controls.professor2Control.valueChanges.pipe(
        startWith<string | Professor>(''),
        map(value => typeof value === 'string' ? value : value.nickname),
        map(name => name ? this.professorsList.filter(prof =>
          prof.name.toLowerCase().indexOf(name.toLowerCase()) === 0): this.professorsList.slice())
      )
    })

    /* Muda a variável de semestre sempre que o semestre mudar na navbar*/
    this.semesterService.getSemesterEmitter().subscribe(semesterKey => {
      this.semesterKey = semesterKey;
    })
    this.semesterService.reemitSemester();

  }

  saveClass() {
    var course = this.classForm.controls.courseControl.value;
    var prof1 = this.classForm.controls.professor1Control.value;
    var prof2 = this.classForm.controls.professor2Control.value;

    // Verifica se as entradas estão nas respectivas lista de disciplinas e professores
    var isCourseValid = course? course.name? true : false : false; 
    var isProf1Valid = prof1? prof1.name? true : false : false;
    var isProf2Valid = prof2? prof2.name? true : false : true;

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

    var self = this;

    this.classesDmService.getNumberOfClasses(this.semesterKey, course.key).then( (number) => {

      let class_ = new Class(
        self.semesterKey,
        course.key,
        number + 1,
        prof1.key,
        prof1? prof1.key : null 
      );

      self.classesDmService.saveClass(class_);
      self.snackBar.open("Turma salva com sucesso", null, {duration: 2500}); 
    }) 
  }

  displayCourse(course?: any): string | undefined {
    return course ? course.name : undefined;
  }

  displayProfessor(professor?: any): string | undefined {
    return professor ? professor.name : undefined;
  }

}
