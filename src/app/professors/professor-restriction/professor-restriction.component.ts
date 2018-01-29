import { Component, OnInit } from '@angular/core';
import { SemesterService } from '../../semesters/semester.service'
import { SemestersDmService } from '../../data-manager/semesters/semesters-dm.service'
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ProfessorRestriction } from '../professor-restriction'
import { ScheduleRestriction } from '../schedule-restriction'
import { ActivatedRoute } from '@angular/router';
import { ProfRestrictionDmService } from '../../data-manager/professor-restrictions/prof-restriction-dm.service'

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

  initialSelection = [];
  allowMultiSelect = true;
  mondaySelection = new SelectionModel<Schedule>(this.allowMultiSelect, this.initialSelection);
  tuesdaySelection = new SelectionModel<Schedule>(this.allowMultiSelect, this.initialSelection);
  wednesdaySelection = new SelectionModel<Schedule>(this.allowMultiSelect, this.initialSelection);
  thursdaySelection = new SelectionModel<Schedule>(this.allowMultiSelect, this.initialSelection);
  fridaySelection = new SelectionModel<Schedule>(this.allowMultiSelect, this.initialSelection);

  constructor(
    private semesterService: SemesterService,
    private semDmService: SemestersDmService,
    private activatedRoute: ActivatedRoute,
    private profRestDmService: ProfRestrictionDmService
  ) { }

  ngOnInit() {
    this.semesterService.getSemesterEmitter().subscribe((semesterKey) => {
      this.semesterKey = semesterKey;
      this.semDmService.getSemesterByKey(semesterKey).valueChanges().subscribe( (semester) => {
        this.semesterId = semester.identifier;
      });
    })
    this.semesterService.reemitSemester();

    this.dataSource = new MatTableDataSource<Schedule>(SCHEDULES_DATA);
    this.professorKey = this.activatedRoute.snapshot.params['id']
  }

  saveRestrictions() {
    let schedules = new ScheduleRestriction(
      this.mondaySelection.selected.map(sch => sch.hour),
      this.tuesdaySelection.selected.map(sch => sch.hour),
      this.wednesdaySelection.selected.map(sch => sch.hour),
      this.thursdaySelection.selected.map(sch => sch.hour),
      this.fridaySelection.selected.map(sch => sch.hour),
    )

    let restrictions = new ProfessorRestriction(
      this.professorKey,
      this.semesterKey,
      this.minimumCredits,
      this.maximumCredits, 
      this.graduationCredits,
      schedules)

    this.profRestDmService.saveRestrictions(restrictions);
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
