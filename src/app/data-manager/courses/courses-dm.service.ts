import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { DataManagerService } from '../data-manager.service';
import { Course } from '../../courses/course';

@Injectable()
export class CoursesDmService {

  readonly coursesListName = "courses";
  readonly coursesListReference = "courses/";

  dm: DataManagerService;
  courses: AngularFireList<JSON>;

  constructor(dm: DataManagerService) {
    this.dm = dm;
    this.courses = dm.createList(this.coursesListName);
  }

  public saveCourse(course: Course) {
    this.dm.push(this.courses, course.toFirebaseObject());
  }

  public existChild(childKey, childValue) {
    return this.courses.query.orderByChild(childKey).equalTo(childValue).once('value').then(
        function (snapshot) {
            return Promise.resolve(snapshot.exists())
        }
    )
  }

  public existCourse(course: Course, courseKey: string) {
    return this.dm.existReference(this.coursesListReference + courseKey);
  }

  getCourses() {
    return this.courses.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  deleteCourse(courseKey: string) {
    return this.dm.delete(this.courses, courseKey);
  }

  getCourseById(courseId: string) {
    return this.dm.readObject(this.coursesListReference + courseId);
  }

  updateCourse(course: Course, courseId: string) {
    return this.dm.update(this.courses, course.toFirebaseObject(), courseId);
  }

}
