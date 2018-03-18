import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { DataManagerService } from '../data-manager.service';
import { SemesterService } from '../../semesters/semester.service'
import { Class } from '../../classes/class'

@Injectable()
export class ClassesDmService {

  readonly allClassesListName = "classes";
  readonly allClassesListReference = "classes/";

  private semesterClassesListName: string;
  private semesterClassesListRef: string;

  private dm: DataManagerService;
  private semesterService: SemesterService;

  semesterClasses: AngularFireList<JSON>; 

  constructor(
    dm: DataManagerService,
    semesterService: SemesterService
  ) { 
    this.dm = dm;
    this.semesterService = semesterService;

    this.semesterService.getSemesterEmitter().subscribe(semesterKey => {
      this.updateSemesterKey(semesterKey);
    })
  }

  /** Salva o objeto class_ no firebase com uma nova key aleatória*/
  saveClass(class_: Class) {
    this.updateSemesterKey(class_.semesterKey)
    this.dm.push(this.semesterClasses, class_.toFirebaseObject())
  }

  getClasses() {
    return this.semesterClasses.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  /**Verifica quantas turmas já existem de uma disciplina (courseKey) no semestre (semesterKey) */
  getNumberOfClasses(courseKey: string) { 
    return this.semesterClasses.query.orderByChild('courseKey').equalTo(courseKey)
            .once('value').then(
              function(snapshot) {
                var list = snapshot.val();
                var number = Object.keys(list? list: []).length
                return Promise.resolve(number);
              }
            )
  }

  /**Atualiza a lista de turmas para o semestre especificado*/
  private updateSemesterKey(semesterKey: string) {
    this.semesterClassesListName = this.allClassesListReference + semesterKey;
    this.semesterClassesListRef = this.semesterClassesListName + '/';
    this.semesterClasses = this.dm.createList(this.semesterClassesListName);
  }

  deleteClass(classKey: string) {
    return this.dm.delete(this.semesterClasses, classKey);
  }

  updateVerification(value: boolean, classKey: string) {
    var obj: any = {verified: value};
    return this.dm.update(this.semesterClasses, <JSON>obj, classKey);
  }

  getClassById(classKey: string) {
    return this.dm.readObject(this.semesterClassesListRef + classKey);
  }

  scheduleClass(classKey: string, day: string, hour: number) {
    var ssubbs;
    //get class query---snapshot?? OR update???
    ssubbs = this.getClassById(classKey).valueChanges().subscribe( class_ => {
      let classToSchedule = new Class(
         this.semesterService.selectedSemesterKey,
         class_.courseKey,
         class_.courseName,
         class_.number,
         class_.professor1Key,
         class_.professor1Name,
         class_.professor2Key? class_.professor2Key : null,
         class_.professor2Name? class_.professor2Name : null
      );
      classToSchedule.setVerifiedState(class_.verified);
      classToSchedule.setSchedule(class_.schedule);
      classToSchedule.addHour(day, hour);

      this.dm.update(this.semesterClasses, classToSchedule.toFirebaseObject(), classKey);
      this.closeOnSubmit(ssubbs);
    });
  }

  closeOnSubmit(subscribed){
    subscribed.unsubscribe();      
  }

  removeClassFromSchedule(class_,day,hour){
    var ssubbs;
    ssubbs = this.dm.readObject(this.semesterClassesListRef +class_.key+"/schedule/"+day+"/hours")
      .valueChanges().subscribe( hours_ =>{
        var hours: any[] = hours_;
        hours.splice(hours.indexOf(hour),1);
        let updatedClass = new Class(
          this.semesterService.selectedSemesterKey,
          class_.courseKey,
          class_.courseName,
          class_.number,
          class_.professor1Key,
          class_.professor1Name,
          class_.professor2Key? class_.professor2Key : null,
          class_.professor2Name? class_.professor2Name : null
        );
        var hoursComplete = this.setNewSchedule(class_,day,hours);
        updatedClass.setSchedule(hoursComplete);
        this.dm.update(this.semesterClasses,updatedClass.toFirebaseObject(),class_.key)
        this.closeOnSubmit(ssubbs);
    });
  }

  setNewSchedule(class_,day,hours_){
    var schedules: any = class_.schedule;
    if(day=='monday'){
      schedules.monday.hours = hours_;
    }else if(day=='tuesday'){
      schedules.tuesday.hours = hours_;
    }else if(day=='wednesday'){
      schedules.wednesday.hours = hours_;
    }else if(day=='thursday'){
      schedules.thursday.hours = hours_;
    }else{
      schedules.friday.hours = hours_;
    }
    return schedules;
  }


}
 