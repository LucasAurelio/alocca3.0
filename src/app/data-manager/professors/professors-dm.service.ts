import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
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
    this.dm.push(this.professors, professor.toFirebaseObject());
  }

  public existChild(childKey, childValue) {
    return this.professors.query.orderByChild(childKey).equalTo(childValue).once('value').then(
        function (snapshot) {
            return Promise.resolve(snapshot.exists())
        }
    )
  }

  public existProfessor(professor: Professor, professorId: string) {
    return this.dm.existReference(this.professorsListReference + professorId);
  }

  getProfessors() {
    return this.professors.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  deleteProfessor(professorId: string) {
    return this.dm.delete(this.professors, professorId);
  }

  getProfessorById(professorId: string) {
    return this.dm.readObject(this.professorsListReference + professorId);
  }

  updateProfessor(professor: Professor, professorId: string) {
    return this.dm.update(this.professors, professor.toFirebaseObject(), professorId);
  }

  
}
