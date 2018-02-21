import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassesDmService } from '../../data-manager/classes/classes-dm.service'
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ProfessorsDmService } from '../../data-manager/professors/professors-dm.service'
import { CoursesDmService } from '../../data-manager/courses/courses-dm.service'
import { startWith } from 'rxjs/operators/startWith';
import { Course } from '../../courses/course'
import { Professor } from '../../professors/professor'
import { map } from 'rxjs/operators/map';


@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css']
})
export class EditClassComponent implements OnInit {

  semesterKey: string;
  classKey: string;

  verified: boolean; 

  filteredCourses: Observable<any[]>;
  filteredProfessors1: Observable<any[]>;
  filteredProfessors2: Observable<any[]>; 

  coursesList: any[];
  professorsList: any[];

  editClassForm = new FormGroup ({
    checkControl: new FormControl(),
    courseControl: new FormControl('', [Validators.required]),
    professor1Control: new FormControl('', [Validators.required]),
    professor2Control: new FormControl()
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private classesDmService: ClassesDmService,
    private coursesDmService: CoursesDmService,
    private profDmService: ProfessorsDmService
  ) { }

  ngOnInit() {
    this.classKey = this.activatedRoute.snapshot.params['id'];

    this.classesDmService.getClassById(this.classKey).valueChanges().subscribe( class_ => {
       this.verified = class_.verified;
    })  

    var controls = this.editClassForm.controls;
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
  }

  displayCourse(course?: any): string | undefined {
    return course ? course.name : undefined;
  }

  displayProfessor(professor?: any): string | undefined {
    return professor ? professor.name : undefined;
  }


} 
