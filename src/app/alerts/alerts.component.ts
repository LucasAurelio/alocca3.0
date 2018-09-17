import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ClassesDmService} from '../data-manager/classes/classes-dm.service'
import { MatSnackBar, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ProfRestrictionDmService } from '../data-manager/professor-restrictions/prof-restriction-dm.service'
import { CoursesDmService } from '../data-manager/courses/courses-dm.service'
import { Alert } from './alert';
import { AlertsDmService } from '../data-manager/alerts/alerts-dm.service';

const CREDITS_VIOLATION = "Violação de créditos";
const DUPLICATED_PROFESSOR = "Professor duplicado";
const PRE_BLOCK = "Recomendação da PRE";

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
      this.checkPREBlocking(class_);
    });
  }
  
  checkPREBlocking(className) {
    console.log(className.courseName);
    let flag = false;
    let dailyBlocking_1 = {monday: "wednesday", tuesday: "thursday", wednesday:"friday", thursday: "monday", friday: "tuesday"};
    //let dailyBlocking_2 = {monday: "thursday", tuesday: "friday", wednesday:"monday", thursday:"tuesday", friday:"wednesday"}
    let hourBlocking = {8: 10, 10: 8, 14: 16, 16: 14};
    
    for(let day in className.schedule){
       let hours = className.schedule[day].hours
       if(hours.length > 1){
        for(var i = 1; i < hours.length; i++){
          if(hours[i] == 8 || hours[i] == 14){
            //checking if has class
            let matchDay = dailyBlocking_1[day];
            let matchHour = hourBlocking[hours[i]];

            for(var j = 0; j < className.schedule[matchDay].hours.length; j ++){
              if (className.schedule[matchDay].hours[j] == matchHour){
                flag = true;
              }
            }
          }else if(hours[i] == 10 || hours[i] == 16){
            let matchDay = dailyBlocking_1[day];
            let matchHour = hourBlocking[hours[i]];

            for(var j = 0; j < className.schedule[matchDay].hours.length; j ++){
              if (className.schedule[matchDay].hours[j] == matchHour){
                flag = true;
              }
            }
          }
        }
      }
    }
    if(flag == false){
      var message = "O horário da disciplina "+ className.courseName + " não está seguindo a blocagem da PRE.";
      let alert = new Alert(this.semesterKey, PRE_BLOCK, message, false);
      this.alertsDmService.saveAlert(alert);
    }
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
