import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SemesterService {

  semesterListener: EventEmitter<string> = new EventEmitter();

  public getSemesterEmitter() {
      return this.semesterListener;
  }

  public emitSemester(semesterKey: string){
      this.semesterListener.emit(semesterKey)
  }

}
