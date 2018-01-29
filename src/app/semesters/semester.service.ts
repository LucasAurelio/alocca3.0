import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SemesterService {

  semesterListener: EventEmitter<string> = new EventEmitter();
  selectedSemesterKey: string;

  public getSemesterEmitter() {
      return this.semesterListener;
  }

  public emitSemester(semesterKey: string){
      this.semesterListener.emit(semesterKey)
      this.selectedSemesterKey = semesterKey;
  }

  public reemitSemester() {
    this.semesterListener.emit(this.selectedSemesterKey)
  }
}
