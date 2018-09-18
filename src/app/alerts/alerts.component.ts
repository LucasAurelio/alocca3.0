import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ClassesDmService } from '../data-manager/classes/classes-dm.service'
import { MatSnackBar, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ProfRestrictionDmService } from '../data-manager/professor-restrictions/prof-restriction-dm.service'
import { CoursesDmService } from '../data-manager/courses/courses-dm.service'
import { Alert } from './alert';
import { AlertsDmService } from '../data-manager/alerts/alerts-dm.service';

const CREDITS_VIOLATION = "Violação de créditos";
const DUPLICATED_PROFESSOR = "Professor duplicado";
const CRED_HOUR_VIOLATION = "Violação de carga horária";
const PROF_HOUR_VIOLATION = "Violação de horário de professor";

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
      this.checkHourPerCreditForCourses(class_.courseKey,class_.timetable,class_.courseName,class_.number);
      this.checkSameSemesterForCourses(class_.courseKey,class_.courseName,class_.number,class_.schedule);
      this.checkSchedulesForProf(class_.professor1Key, class_.professor1Name, class_.schedule);
      this.checkSchedulesForProf(class_.professor2Key, class_.professor2Name, class_.schedule);
    });
  }

  checkSchedulesForProf(profKey, profName, schedule) {
    this.restrictionDmService.getRestrictionById(this.semesterKey, profKey).valueChanges().subscribe( restrictions => {
      if (restrictions && restrictions.scheduleRestrictions) {
        let timeShock: string = this.hoursRestricted(schedule, restrictions.scheduleRestrictions);
        if (timeShock) {
          const message = "O professor " + profName + " possui restrições para o(s) horário(s): " + timeShock;
          let alert = new Alert(this.semesterKey, PROF_HOUR_VIOLATION, message, false);
          this.alertsDmService.saveAlert(alert);
        }
      }
    })
  }

  private hoursRestricted(schedule, scheduleRestrictions): string{
    let intersectionHours = "";
    this.intersection(schedule.monday.hours,scheduleRestrictions.monday).forEach(hour =>{
      if (intersectionHours){
        intersectionHours = intersectionHours + ", ";
      }
      intersectionHours = intersectionHours + "2: "+ hour + "h"
    });
    this.intersection(schedule.tuesday.hours,scheduleRestrictions.tuesday).forEach(hour =>{
      if (intersectionHours){
        intersectionHours = intersectionHours + ", ";
      }
      intersectionHours = intersectionHours + "3: "+ hour + "h"
    });
    this.intersection(schedule.wednesday.hours,scheduleRestrictions.wednesday).forEach(hour =>{
      if (intersectionHours){
        intersectionHours = intersectionHours + ", ";
      }
      intersectionHours = intersectionHours + "4: "+ hour + "h"
    });
    this.intersection(schedule.thursday.hours,scheduleRestrictions.thursday).forEach(hour =>{
      if (intersectionHours){
        intersectionHours = intersectionHours + ", ";
      }
      intersectionHours = intersectionHours + "5: "+ hour + "h"
    });
    this.intersection(schedule.friday.hours,scheduleRestrictions.friday).forEach(hour =>{
      if (intersectionHours){
        intersectionHours = intersectionHours + ", ";
      }
      intersectionHours = intersectionHours + "6: "+ hour + "h"
    });
    return intersectionHours;
  }

  private intersection ( array1: any[], array2: any[]): any[] {
    let result: any[] = [];
    let dict: {} = {};
    for (let el of array1) {
      if (!(el in dict)) {
        dict[el] = 1;
      }
    }
    for (let el2 of array2) {
      if (el2 in dict && dict[el2] !== 2) {
        dict[el2] = 2;
        result.push(el2);
      }
    }
    return result;
  };

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

  checkHourPerCreditForCourses(courseKey,timetable,courseName,classNumber){
    this.coursesDmService.getCourseById(courseKey).valueChanges().subscribe(cours => {
      if (cours.credits > timetable){
        var message = "A turma "+ classNumber + " de " + courseName + " não possui horários suficientes para a sua quantidade de créditos";
        let alert = new Alert(this.semesterKey, CRED_HOUR_VIOLATION, message, false);
        this.alertsDmService.saveAlert(alert);
      }
      if (cours.credits < timetable){
        var message = "A turma "+ classNumber + " de " + courseName + " possui mais horários que o necessário para sua quantidade de créditos";
        let alert = new Alert(this.semesterKey, CRED_HOUR_VIOLATION, message, false);
        this.alertsDmService.saveAlert(alert);
      }
    })
  }

  checkSameSemesterForCourses(courseKey,courseName,classNumber,schedule){
    this.classes.forEach(class_ =>{
      if (class_.courseKey != courseKey){
        this.coursesDmService.getCourseById(courseKey).valueChanges().subscribe(course1 =>{
          this.coursesDmService.getCourseById(class_.courseKey).valueChanges().subscribe(course2 =>{
            if(course1.maximumSemester==course2.maximumSemester ||
            course1.minimumSemester==course2.minimumSemester ||
            course1.maximumSemester==course2.minimumSemester ||
            course1.minimumSemester==course2.maximumSemester ||
            (course1.maximumSemester<course2.maximumSemester && course1.maximumSemester>course2.minimumSemester) ||
            (course1.minimumSemester<course2.maximumSemester && course1.minimumSemester>course2.minimumSemester)){
              let timeShock: string = this.checkScheduleShocks(schedule,class_.schedule);
              if(timeShock){
                var message = "A turma "+ classNumber + " de " + courseName +" e a turma "+ class_.number + " de " + class_.courseName + ", sugeridas para o(s) mesmo(s) semestre(s), estão alocadas para o(s) mesmo(s) horário(s): " + timeShock;
                let alert = new Alert(this.semesterKey, CRED_HOUR_VIOLATION, message, false);
                this.alertsDmService.saveAlert(alert);
              }else{
              }
            }
          })
        })
      }
    })
  }

  private checkScheduleShocks(schedule1,schedule2): string{
    let finalString = "";
    let monday1 = schedule1.monday.hours;
    let tuesday1 = schedule1.tuesday.hours;
    let wednesday1 = schedule1.wednesday.hours;
    let thursday1 = schedule1.thursday.hours;
    let friday1 = schedule1.friday.hours;
    let monday2 = schedule2.monday.hours;
    let tuesday2 = schedule2.tuesday.hours;
    let wednesday2 = schedule2.wednesday.hours;
    let thursday2 = schedule2.thursday.hours;
    let friday2 = schedule2.friday.hours;
    monday1.forEach(hour1 =>{
      if(hour1){
        monday2.forEach(hour2 =>{
          if(hour1==hour2){
            if(finalString){
              finalString = finalString + ", 2: "+ hour1 + "h"
            }else{
              finalString = finalString + "2: "+ hour1 + "h"
            }
          }
        })
      }
    })
    tuesday1.forEach(hour1 =>{
      if(hour1){
        tuesday2.forEach(hour2 =>{
          if(hour1==hour2){
            if(finalString){
              finalString = finalString + ", 3: "+ hour1 + "h"
            }else{
              finalString = finalString + "3: "+ hour1 + "h"
            }
          }
        })
      }
    })
    wednesday1.forEach(hour1 =>{
      if(hour1){
        wednesday2.forEach(hour2 =>{
          if(hour1==hour2){
            if(finalString){
              finalString = finalString + ", 4: "+ hour1 + "h"
            }else{
              finalString = finalString + "4: "+ hour1 + "h"
            }
          }
        })
      }
    })
    thursday1.forEach(hour1 =>{
      if(hour1){
        thursday2.forEach(hour2 =>{
          if(hour1==hour2){
            if(finalString){
              finalString = finalString + ", 5: "+ hour1 + "h"
            }else{
              finalString = finalString + "5: "+ hour1 + "h"
            }
          }
        })
      }
    })
    friday1.forEach(hour1 =>{
      if(hour1){
        friday2.forEach(hour2 =>{
          if(hour1==hour2){
            if(finalString){
              finalString = finalString + ", 6: "+ hour1 + "h"
            }else{
              finalString = finalString + "6: "+ hour1 + "h"
            }
          }
        })
      }
    })

    return finalString;
  }

}
