import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { DataManagerService } from '../data-manager.service';
import { User } from '../../users/user';

@Injectable()
export class UsersDmService {
 
  readonly usersListName = "users";
  readonly usersListReference = "users/";

  dm: DataManagerService;
  users: AngularFireList<JSON>;

  constructor(dm: DataManagerService) {
    this.dm = dm;
    this.users = dm.createList(this.usersListName);
  }

  public saveUser(user: User) {
    this.dm.push(this.users, user.toFirebaseObject());
  }

  public existChild(childKey, childValue) {
      return this.users.query.orderByChild(childKey).equalTo(childValue).once('value').then(
        function (snapshot) {
            return Promise.resolve(snapshot.exists())
        }
    )
  }

  public existUser(user: User, userId: string) {
      return this.dm.existReference(this.usersListReference + userId);
  }

  getUsers() {
      return this.users.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  deleteUser(userId: string) {
      return this.dm.delete(this.users, userId);
  }

  getUserById(userId: string) {
      return this.dm.readObject(this.usersListReference + userId);
  }

  updateUser(user: User, userId: string) {
      return this.dm.update(this.users, user.toFirebaseObject(), userId);
  }

  checkEmail(userEmail: string) {
      return this.existChild("email", userEmail);
  }
  
}
