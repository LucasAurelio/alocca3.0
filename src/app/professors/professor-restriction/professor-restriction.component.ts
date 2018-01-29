import { Component, OnInit } from '@angular/core';
import { SemesterService } from '../../semesters/semester.service'
import { SemestersDmService } from '../../data-manager/semesters/semesters-dm.service'
import { MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-professor-restriction',
  templateUrl: './professor-restriction.component.html',
  styleUrls: ['./professor-restriction.component.css']
})
export class ProfessorRestrictionComponent implements OnInit {

  semester: string;

  minimumCredits: number;
  maximumCredits: number;
  graduationCredits: number;

  dataSource: MatTableDataSource<Schedule>;

  constructor(
    private semesterService: SemesterService,
    private semDmService: SemestersDmService
  ) { }

  ngOnInit() {
    this.semesterService.getSemesterEmitter().subscribe((semesterKey) => {
      this.semDmService.getSemesterById(semesterKey).valueChanges().subscribe( (semester) => {
        this.semester = semester.identifier;
      });
    })
    this.semesterService.reemitSemester();

    this.dataSource = new MatTableDataSource<Schedule>(SCHEDULES_DATA);
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
