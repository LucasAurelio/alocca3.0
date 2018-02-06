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

  getClasses(semesterKey: string) {
    this.updateSemesterKey(semesterKey);
    return this.semesterClasses.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  /**Verifica quantas turmas já existem de uma disciplina (courseKey) no semestre (semesterKey) */
  getNumberOfClasses(semesterKey: string, courseKey: string) { 
    this.updateSemesterKey(semesterKey);
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

  deleteClass(semesterKey: string, classKey: string) {
    this.updateSemesterKey(semesterKey);
    return this.dm.delete(this.semesterClasses, classKey);
  }

  updateVerification(semesterKey: string, value: boolean, classKey: string) {
    this.updateSemesterKey(semesterKey);
    var obj: any = {verified: value};
    return this.dm.update(this.semesterClasses, <JSON>obj, classKey);
  }


}
 