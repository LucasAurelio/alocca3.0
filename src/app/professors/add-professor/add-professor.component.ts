import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-professor',
  templateUrl: './add-professor.component.html',
  styleUrls: ['./add-professor.component.css']
})
export class AddProfessorComponent implements OnInit {

  siap: any;
  name: any;
  nickname: any;
  
  constructor() { }

  ngOnInit() {
  }

}
