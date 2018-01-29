import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { DataManagerService } from '../data-manager.service';
import { SemesterService } from '../../semesters/semester.service'
import { ProfessorRestriction } from '../../professors/professor-restriction'

@Injectable()
export class ProfRestrictionDmService {

  readonly allRestrictionsListName = "prof-restrictions";
  readonly allRestrictionsListReference = "prof-restrictions/";

  private semesterRestrictionsListName: string;
  private semesterRestrictionsListRef: string;

  private dm: DataManagerService;
  private semesterService: SemesterService;

  allRestrictions: AngularFireList<JSON>; 
  semesterRestrictions: AngularFireList<JSON>; 

  constructor(
    dm: DataManagerService,
    semesterService: SemesterService
  ) {
    this.dm = dm;
    this.semesterService = semesterService;
    this.allRestrictions = dm.createList(this.allRestrictionsListName);

    this.semesterService.getSemesterEmitter().subscribe(semesterKey => {
      this.updateSemesterKey(semesterKey);
    })
  }

  saveRestrictions(restrictions: ProfessorRestriction) {
    this.updateSemesterKey(restrictions.semesterKey)
    this.dm.set(this.semesterRestrictions, restrictions.toFirebaseObject(), restrictions.professorKey);
  }

  private updateSemesterKey(semesterKey: string) {
    this.semesterRestrictionsListName = this.allRestrictionsListReference + semesterKey;
    this.semesterRestrictionsListRef = this.semesterRestrictionsListName + '/';
    this.semesterRestrictions = this.dm.createList(this.semesterRestrictionsListName);
  }

}
