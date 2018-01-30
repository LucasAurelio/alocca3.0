import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { DataManagerService } from '../data-manager.service';
import { Request } from '../../requests/request.model';

@Injectable()
export class RequestsDmService {

  readonly requestsListName = "requests";
  readonly requestsListReference = "requests/";

  dm: DataManagerService;
  requests: AngularFireList<JSON>;

  constructor(dm: DataManagerService) {
    this.dm = dm;
    this.requests = dm.createList(this.requestsListName);
  }

  public saveRequest(request: Request) {
    this.dm.push(this.requests, request.toFirebaseObject());
  }

  public existChild(childKey, childValue) {
      return this.requests.query.orderByChild(childKey).equalTo(childValue).once('value').then(
        function (snapshot) {
            return Promise.resolve(snapshot.exists())
        }
    )
  }

  public existRequest(request: Request, requestId: string) {
      return this.dm.existReference(this.requestsListReference + requestId);
  }

  getRequests() {
      return this.requests.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  deleteRequest(requestId: string) {
      return this.dm.delete(this.requests, requestId);
  }

  getRequestById(requestId: string) {
      return this.dm.readObject(this.requestsListReference + requestId);
  }

  updateUser(request: Request, requestId: string) {
      return this.dm.update(this.requests, request.toFirebaseObject(), requestId);
  }
}
