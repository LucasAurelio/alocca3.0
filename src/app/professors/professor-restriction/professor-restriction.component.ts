import { Component, OnInit, ViewChild } from '@angular/core';
import { SemesterService } from '../../semesters/semester.service'
import { SemestersDmService } from '../../data-manager/semesters/semesters-dm.service'
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ProfessorRestriction } from '../professor-restriction'
import { ScheduleRestriction } from '../schedule-restriction'
import { ActivatedRoute, Router } from '@angular/router';
import { ProfRestrictionDmService } from '../../data-manager/professor-restrictions/prof-restriction-dm.service'
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-professor-restriction',
  templateUrl: './professor-restriction.component.html',
  styleUrls: ['./professor-restriction.component.css']
}) 
export class ProfessorRestrictionComponent implements OnInit {

  semesterId: string;
  semesterKey: string;
  professorKey: string;

  minimumCredits: number;
  maximumCredits: number;
  graduationCredits: number;

  dataSource: MatTableDataSource<Schedule>;
  @ViewChild('restrictionsForm') form;

  initialSelection = [];
  allowMultiSelect = true;
  mondaySelection = new SelectionModel<number>(this.allowMultiSelect, this.initialSelection);
  tuesdaySelection = new SelectionModel<number>(this.allowMultiSelect, this.initialSelection);
  wednesdaySelection = new SelectionModel<number>(this.allowMultiSelect, this.initialSelection);
  thursdaySelection = new SelectionModel<number>(this.allowMultiSelect, this.initialSelection);
  fridaySelection = new SelectionModel<number>(this.allowMultiSelect, this.initialSelection);

  constructor(
    private semesterService: SemesterService,
    private semDmService: SemestersDmService,
    private activatedRoute: ActivatedRoute,
    private profRestDmService: ProfRestrictionDmService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.professorKey = this.activatedRoute.snapshot.params['id']

    this.semesterService.getSemesterEmitter().subscribe((semesterKey) => {
      this.semesterKey = semesterKey;

      this.semDmService.getSemesterByKey(semesterKey).valueChanges().subscribe( (semester) => {
        this.semesterId = semester.identifier;
      });

      this.profRestDmService.getRestrictionById(semesterKey, this.professorKey).valueChanges().subscribe(
        restrictions => {

          if (restrictions) {
            this.minimumCredits = restrictions.minCredits;
            this.maximumCredits = restrictions.maxCredits;
            this.graduationCredits = restrictions.graduationCredits;
  
            restrictions.scheduleRestrictions.monday? restrictions.scheduleRestrictions.monday.forEach(
              element => { this.mondaySelection.select(element); }) : undefined;
  
            restrictions.scheduleRestrictions.tuesday?  restrictions.scheduleRestrictions.tuesday.forEach(
              element => { this.tuesdaySelection.select(element); }) : undefined;
  
            restrictions.scheduleRestrictions.wednesday?  restrictions.scheduleRestrictions.wednesday.forEach(
              element => { this.wednesdaySelection.select(element); }) : undefined;
              
            restrictions.scheduleRestrictions.thursday?  restrictions.scheduleRestrictions.thursday.forEach(
              element => { this.thursdaySelection.select(element); }) : undefined;
  
            restrictions.scheduleRestrictions.friday?  restrictions.scheduleRestrictions.friday.forEach(
              element => { this.fridaySelection.select(element); }) : undefined;   
          } else {
            this.form.resetForm();
            this.cleanTable();
          }
            
        }
      )
    })

    this.semesterService.reemitSemester();

    this.dataSource = new MatTableDataSource<Schedule>(SCHEDULES_DATA);

  }

  saveRestrictions() {
    let schedules = new ScheduleRestriction(
      this.mondaySelection.selected,
      this.tuesdaySelection.selected,
      this.wednesdaySelection.selected,
      this.thursdaySelection.selected,
      this.fridaySelection.selected,
    )

    let restrictions = new ProfessorRestriction(
      this.professorKey,
      this.semesterKey,
      this.minimumCredits,
      this.maximumCredits, 
      this.graduationCredits,
      schedules)

    this.profRestDmService.saveRestrictions(restrictions);
    this.snackBar.open("Restrições atualizadas", null, {duration: 2500});
    this.router.navigateByUrl("professors")
  }

  private cleanTable() {
    this.mondaySelection.clear();
    this.tuesdaySelection.clear();
    this.wednesdaySelection.clear();
    this.thursdaySelection.clear();
    this.fridaySelection.clear();
  }

}


export interface Schedule {
  hour: number;
  range: string;
}

const SCHEDULES_DATA: Schedule[] = [
  {hour: 7, range: "7:00 - 8:00"},
  {hour: 8, range: "8:00 - 10:00"},
  {hour: 10, range: "10:00 - 12:00"},
  {hour: 12, range: "12:00 - 14:00"},
  {hour: 14, range: "14:00 - 16:00"},
  {hour: 16, range: "16:00 - 18:00"},
  {hour: 18, range: "18:00 - 20:00"},
  {hour: 20, range: "20:00 - 22:00"},
];
