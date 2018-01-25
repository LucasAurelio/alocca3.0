import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class DataManagerService {

    db: AngularFireDatabase;

    constructor(db: AngularFireDatabase) {
      this.db = db;
     }

  // Documentar 
  createList(listReference: string) { 
    return this.db.list<JSON>(listReference);
  }

  push(list: AngularFireList<JSON>, object: JSON) {
    list.push(object);
    return list;
  }

  set(list: AngularFireList<JSON>, object: JSON, objReference: string) {
      list.set(objReference, object);
      return list;
  }

  update(list: AngularFireList<JSON>, object: JSON, objReference: string) {
    return list.update(objReference, object).then(() => {
      return Promise.resolve(list);
    }).catch((error) => {
      return Promise.reject(error);
    });
  }

  delete(list: AngularFireList<JSON>, objReference: string) {
    return list.remove(objReference).then(() => {
      return Promise.resolve(list);
    }).catch((error) => {
      return Promise.reject(error);
    });
  }

  deleteList(list: AngularFireList<JSON>) {
    list.remove();
    return list;
  }

  readObject(reference: string): AngularFireObject<any> {
      return this.db.object(reference);
  }

  existReference(reference: string) {
    return this.db.database.ref(reference).once('value').then(function(snapshot) {
      return Promise.resolve(snapshot.exists())
    })
  }
}