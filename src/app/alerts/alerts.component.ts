import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ClassesDmService } from '../data-manager/classes/classes-dm.service'
import { MatSnackBar, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ProfRestrictionDmService } from '../data-manager/professor-restrictions/prof-restriction-dm.service'
import { CoursesDmService } from '../data-manager/courses/courses-dm.service'
import { Alert } from './alert';
import { AlertsDmService } from '../data-manager/alerts/alerts-dm.service';

const CREDITS_VIOLATION = "Violação de créditos";
const DUPLICATED_PROFESSOR = "Professor duplicado";

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})

export class AlertsComponent implements OnInit,OnChanges {

  @Input() semesterKey: string;

  opened: boolean;
  classes: any[];
  restricitons: any[];
  alerts: any[];
  ignoredAlerts: any[];


  constructor(
    private classesDmService: ClassesDmService,
    private restrictionDmService: ProfRestrictionDmService,
    private coursesDmService: CoursesDmService,
    private alertsDmService: AlertsDmService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["semesterKey"]) {
      this.ngOnInit();
    }
  }

  ngOnInit() {
    this.alertsDmService.deleteAlerts();

    this.classesDmService.getClasses().subscribe( classes => {
      this.classes = classes;
      this.checkConstraints();
    });

    this.alertsDmService.getAlerts().subscribe( alerts => {
      this.alerts = alerts.filter(al => { return ! al.isIgnored });
      this.ignoredAlerts = alerts.filter(al => { return al.isIgnored });
    })
  }

  checkConstraints() {
    this.classes.forEach(class_ => {
      this.checkMinCreditsForProf(class_.professor1Key, class_.professor1Name);
      this.checkMinCreditsForProf(class_.professor2Key, class_.professor2Name);
      this.checkMaxCreditsForProf(class_.professor1Key, class_.professor1Name);
      this.checkMaxCreditsForProf(class_.professor2Key, class_.professor2Name);
    });
  }

  checkMinCreditsForProf(profKey, profName) {
    var currentCredits = 0;
    this.classes.forEach(class_ => {
      if (class_.professor1Key == profKey) {
        // this.coursesDmService.getCourseById(class_.courseKey).
        currentCredits = currentCredits + 4;
      }
    })
    this.restrictionDmService.getRestrictionById(this.semesterKey, profKey).valueChanges().subscribe( restrictions => {
      if (restrictions) {
        if (currentCredits < restrictions.minCredits) {
          var message = "O professor " + profName + " não atingiu o mínimo de créditos";
          let alert = new Alert(this.semesterKey, CREDITS_VIOLATION, message, false);
          this.alertsDmService.saveAlert(alert);
        }
      }
    })
  }

  checkMaxCreditsForProf(profKey, profName) {
    var currentCredits = 0;
    this.classes.forEach(class_ => {
      if (class_.professor1Key == profKey) {
        // this.coursesDmService.getCourseById(class_.courseKey). 
        currentCredits = currentCredits + 4;
      }
    })
    this.restrictionDmService.getRestrictionById(this.semesterKey, profKey).valueChanges().subscribe( restrictions => {
      if (restrictions) {
        if (currentCredits > restrictions.maxCredits) {
          var message = "O professor " + profName + " ultrapassou o máximo de créditos";
          let alert = new Alert(this.semesterKey, CREDITS_VIOLATION, message, false);
          this.alertsDmService.saveAlert(alert);
        }
      }
    })
  }
}
