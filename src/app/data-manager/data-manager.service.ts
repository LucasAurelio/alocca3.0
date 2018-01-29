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
  createList(listName: string) { 
    return this.db.list<JSON>(listName);
  }

  push(list: AngularFireList<JSON>, object: JSON) {
    return list.push(object);
  }

  set(list: AngularFireList<JSON>, object: JSON, objReference: string) {
      return list.set(objReference, object).then(() => {
        return Promise.resolve();
      }).catch((error) => {
        return Promise.reject(error);
      });
  }

  update(list: AngularFireList<JSON>, object: JSON, objReference: string) {
    return list.update(objReference, object).then(() => {
      return Promise.resolve();
    }).catch((error) => {
      return Promise.reject(error);
    });
  }

  delete(list: AngularFireList<JSON>, objReference: string) {
    return list.remove(objReference).then(() => {
      return Promise.resolve();
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