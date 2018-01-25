import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { DataManagerService } from '../data-manager.service';
import { Professor } from '../../professors/professor';

@Injectable()
export class ProfessorsDmService {

  readonly professorsListName = "professors";
  readonly professorsListReference = "professors/";

  dm: DataManagerService;
  professors: AngularFireList<JSON>;

  constructor(dm: DataManagerService) {
    this.dm = dm;
    this.professors = dm.createList(this.professorsListName);
  }

  public saveProfessor(professor: Professor) {
    console.log(professor.siap, professor.name, professor.nickname)
    this.dm.set(this.professors, professor.toFirebaseObject(), String(professor.siap))
  }

  public existsChild(childKey, childValue) {
    return this.professors.query.orderByChild(childKey).equalTo(childValue).once('value').then(
        function (snapshot) {
            return Promise.resolve(snapshot.exists())
        }
    )
  }

  public existProfessor(professor: Professor) {
    return this.dm.existReference(this.professorsListReference + professor.siap);
  }

  
}
