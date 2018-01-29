import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { DataManagerService } from '../data-manager.service';
import { Semester } from '../../semesters/semester'

@Injectable()
export class SemestersDmService {

  readonly semestersListName = "semesters";
  readonly semestersListReference = "semesters/";

  dm: DataManagerService;
  semesters: AngularFireList<JSON>;

  constructor(dm: DataManagerService) {
    this.dm = dm;
    this.semesters = dm.createList(this.semestersListName);
  }

  public saveSemester(semester: Semester) {
    return this.dm.push(this.semesters, semester.toFirebaseObject()).key;
  }

  public existChild(childKey, childValue) {
    return this.semesters.query.orderByChild(childKey).equalTo(childValue).once('value').then(
        function (snapshot) {
            return Promise.resolve(snapshot.exists())
        }
    )
  }

  getSemesters() {
    return this.semesters.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  deleteSemester(semesterId: string) {
    return this.dm.delete(this.semesters, semesterId);
  }

  getSemesterByKey(semesterKey: string) {
    return this.dm.readObject(this.semestersListReference + semesterKey);
  }

}
