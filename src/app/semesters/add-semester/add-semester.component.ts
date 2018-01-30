import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Semester } from '../semester'
import { SemestersDmService } from '../../data-manager/semesters/semesters-dm.service'
import { SemesterService } from '../semester.service'

@Component({
  selector: 'app-add-semester',
  templateUrl: './add-semester.component.html',
  styleUrls: ['./add-semester.component.css']
})
export class AddSemesterComponent implements OnInit {

  static readonly  REQUIRED_FIELD_ERROR_MSG = 'Campo obrigatório';

  year: number;
  collegeSemester: number;

  years: number[] = [];
  semesters: number[] = [1, 2]

  constructor(
    private semDmService: SemestersDmService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddSemesterComponent>,
    private semesterService: SemesterService
  ) { }

  ngOnInit() {
    this.initYears();
  }

  yearControl = new FormControl('', [Validators.required]);
  semesterControl = new FormControl('', [Validators.required]);

  initYears() {
    for (var i = 0; i < 50; i++) {
      this.years.push(2017 + i);
    } 
  }

  getErrorMessage(control: FormControl) {
  return control.hasError('required') ? AddSemesterComponent.REQUIRED_FIELD_ERROR_MSG :
          '';
  }

  saveSemester() {
    let sem = new Semester(this.year, this.collegeSemester);

    this.semDmService.existChild('identifier', sem.identifier).then((exists) => {
      if (exists) {
        this.snackBar.open("Esse semestre já existe.", null, {duration: 2500});
      } else {
        let semesterKey = this.semDmService.saveSemester(sem);
        this.snackBar.open("Semestre criado com sucesso", null, {duration: 2500});
        this.semesterService.emitSemester(semesterKey);
        this.dialogRef.close();
      }
    })
  }
}
