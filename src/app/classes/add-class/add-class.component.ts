import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CoursesDmService } from '../../data-manager/courses/courses-dm.service'
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { ProfessorsDmService } from '../../data-manager/professors/professors-dm.service'

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

  courseControl: FormControl = new FormControl();
  professor1Control: FormControl = new FormControl();
  professor2Control: FormControl = new FormControl();  

  filteredCourses: Observable<any[]>;
  filteredProfessors1: Observable<any[]>;
  filteredProfessors2: Observable<any[]>;  

  coursesList: any[];
  professorsList: any[];

  constructor(
    private coursesDmService: CoursesDmService,
    private profDmService: ProfessorsDmService
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

    
  }

}
