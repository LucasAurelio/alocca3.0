import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassesDmService } from '../../data-manager/classes/classes-dm.service'
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ProfessorsDmService } from '../../data-manager/professors/professors-dm.service'
import { CoursesDmService } from '../../data-manager/courses/courses-dm.service'
import { startWith } from 'rxjs/operators/startWith';
import { Course } from '../../courses/course'
import { Professor } from '../../professors/professor'
import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators/map';
import { Class } from '../class';
import { SemesterService } from '../../semesters/semester.service'


@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css']
})
export class EditClassComponent implements OnInit {

  editClassForm: FormGroup;

  semesterKey: string;
  classKey: string;
  verified: boolean;
  schedule: any;
  filteredCourses: Observable<any[]>;
  filteredProfessors1: Observable<any[]>;
  filteredProfessors2: Observable<any[]>; 

  originalProf1Key;
  originalProf2Key;

  coursesList: any[];
  professorsList: any[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private classesDmService: ClassesDmService,
    private coursesDmService: CoursesDmService,
    private profDmService: ProfessorsDmService,
    private FB: FormBuilder,
    private snackBar: MatSnackBar,
    private semesterService: SemesterService,
    private router: Router
  ) { }

  ngOnInit() {
    this.classKey = this.activatedRoute.snapshot.params['id'];

    this.editClassForm = this.FB.group({
      courseControl: ['', Validators.required],
      professor1Control: ['', Validators.required],
      professor2Control: [''],
      numberControl: ['', Validators.required],
      noteControl: ['']
    });

    this.classesDmService.getClassById(this.classKey).valueChanges().subscribe( class_ => {
      this.schedule = class_.schedule;
      this.verified = class_.verified;
      this.coursesDmService.getCourseById(class_.courseKey).valueChanges().subscribe( cors_ => {
        this.profDmService.getProfessorById(class_.professor1Key).valueChanges().subscribe(prof1 => {
          if(!class_.professor2Key){
            this.originalProf1Key = class_.professor1Key;
            this.originalProf2Key = null;
            this.editClassForm.patchValue({
              courseControl: {
                key: class_.courseKey,
                code: cors_.code,
                name: cors_.name,
                shortname: cors_.shortname,
                credits: cors_.credits,
                type: cors_.type,
                offererDepartment: cors_.offererDepartment,
                requesterDepartment: cors_.requesterDepartment,
                minimumSemester: cors_.minimumSemester,
                maximumSemester: cors_.maximumSemester
              },
              professor1Control: {
                key: class_.professor1key,
                name: prof1.name,
                nickname: prof1.nickname,
                siape: prof1.siape
              },
              professor2Control: '',
              numberControl: class_.number,
              noteControl: class_.note? class_.note : null
            })
          }else{
            this.profDmService.getProfessorById(class_.professor2Key).valueChanges().subscribe( prof2 =>{
              this.originalProf1Key = class_.professor1Key;
              this.originalProf2Key = class_.professor2Key;
              this.editClassForm.patchValue({
                courseControl: {
                  key: class_.courseKey,
                  code: cors_.code,
                  name: cors_.name,
                  shortname: cors_.shortname,
                  credits: cors_.credits,
                  type: cors_.type,
                  offererDepartment: cors_.offererDepartment,
                  requesterDepartment: cors_.requesterDepartment,
                  minimumSemester: cors_.minimumSemester,
                  maximumSemester: cors_.maximumSemester
                },
                professor1Control: {
                  key: class_.professor1key,
                  name: prof1.name,
                  nickname: prof1.nickname,
                  siape: prof1.siape
                },
                professor2Control: {
                  key: class_.professor2key,
                  name: prof2.name,
                  nickname: prof2.nickname,
                  siape: prof2.siape
                },
                numberControl: class_.number,
                noteControl: class_.note? class_.note : null
              })
            })
          }
        })
      })
    })  

    var ctrl = this.editClassForm;

    /* Recupera a lista de disciplinas e a conecta ao autocompletar juntamente com um filtro*/
    this.coursesDmService.getCourses().subscribe(courses => {
      this.coursesList = courses;

      this.filteredCourses = ctrl.controls.courseControl.valueChanges.pipe(
        startWith<string | Course>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.coursesList.filter(course =>
          course.name.toLowerCase().indexOf(name.toLowerCase()) === 0) : this.coursesList.slice())
      );
    });

    /* Recupera a lista de professores e conecta ao autocompletar juntamente com um filtro*/
    this.profDmService.getProfessors().subscribe( professors => {
      this.professorsList = professors;

      this.filteredProfessors1 = ctrl.controls.professor1Control.valueChanges.pipe(
        startWith<string | Professor>(''),
        map(value => typeof value === 'string' ? value : value.nickname),
        map(name => name ? this.professorsList.filter(prof =>
          prof.name.toLowerCase().indexOf(name.toLowerCase()) === 0): this.professorsList.slice())
      )

      this.filteredProfessors2 = ctrl.controls.professor2Control.valueChanges.pipe(
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

  saveInformation() {
    var course = this.editClassForm.controls.courseControl.value;
    var prof1 = this.editClassForm.controls.professor1Control.value;
    console.log(prof1.key);
    console.log(prof1.name);
    var prof2 = this.editClassForm.controls.professor2Control.value;
    var number = this.editClassForm.controls.numberControl.value;
    var note = this.editClassForm.controls.noteControl.value;
    console.log(note);

    // Verifica se as entradas estão nas respectivas lista de disciplinas e professores
    var isCourseValid = course? course.shortname? true : false : false; 
    var isProf1Valid = prof1? prof1.nickname? true : false : false;
    var isProf2Valid = prof2? prof2.nickname? true : false : true;

    // Validações
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

    if (prof2 && prof2.name && prof2.name == prof1.name) {
      this.snackBar.open("Os professores não podem ser iguais", null, {duration: 3000});
      return;
    }

    console.log(this.semesterKey);
    this.semesterKey = this.classesDmService.getCurrentSemester();
    console.log(this.semesterKey);

      let class_ = new Class(
        this.semesterKey,
        course.key,
        course.shortname,
        number,
        prof1.key? prof1.key : this.originalProf1Key,
        prof1.nickname,
        prof2? prof2.key? prof2.key : this.originalProf2Key : null,
        prof2? prof2.nickname : null,
        course.type,
        course.minimumSemester
      );
      if(note){
        class_.setNote(this.editClassForm.controls.noteControl.value);
      }else{
        class_.setNote("");
      }
      class_.setSchedule(this.schedule);
      class_.setVerifiedState(this.verified);
      this.classesDmService.deleteClass(this.classKey);
      this.classesDmService.saveClass(class_);
      this.snackBar.open("Turma atualizada com sucesso", null, {duration: 2500});
      this.router.navigateByUrl('classes');
  }

} 
