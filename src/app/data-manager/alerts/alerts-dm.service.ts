import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { DataManagerService } from '../data-manager.service';
import { SemesterService } from '../../semesters/semester.service'
import { Alert }  from '../../alerts/alert'

@Injectable()
export class AlertsDmService {

  readonly allAlertsListName = "alerts";
  readonly allAlertsListReference = "alerts/";

  private semesterAlertsListName: string;
  private semesterAlertsListRef: string;

  private dm: DataManagerService;
  private semesterService: SemesterService;

  allAlerts: AngularFireList<JSON>; 
  semesterAlerts: AngularFireList<JSON>;

  constructor(
    dm: DataManagerService,
    semesterService: SemesterService
  ) {
    this.dm = dm;
    this.semesterService = semesterService;
    this.allAlerts = dm.createList(this.allAlertsListName);

    this.semesterService.getSemesterEmitter().subscribe(semesterKey => {
      this.updateSemesterKey(semesterKey);
    })
  }

  saveAlert(alert: Alert) {
    this.updateSemesterKey(alert.semesterKey)
    this.dm.push(this.semesterAlerts, alert.toFirebaseObject());
  }

  getAlerts() {
    return this.semesterAlerts.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  ignoreAlert(alertKey: string) {
    var obj: any = {isIgnored: true};
    return this.dm.update(this.semesterAlerts, <JSON>obj, alertKey);
  }

  undoIgnoredAlert(alertKey: string) {
    var obj: any = {isIgnored: false};
    return this.dm.update(this.semesterAlerts, <JSON>obj, alertKey);
  }

  deleteAlerts() {
    this.semesterAlerts = this.dm.deleteList(this.semesterAlerts);
  }

  private updateSemesterKey(semesterKey: string) {
    this.semesterAlertsListName = this.allAlertsListReference + semesterKey;
    this.semesterAlertsListRef = this.semesterAlertsListName + '/';
    this.semesterAlerts = this.dm.createList(this.semesterAlertsListName);
  }

}
