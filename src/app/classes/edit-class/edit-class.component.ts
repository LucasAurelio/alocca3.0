import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassesDmService } from '../../data-manager/classes/classes-dm.service'
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css']
})
export class EditClassComponent implements OnInit {

  semesterKey: string;
  classKey: string;

  verified: boolean;

  editClassForm = new FormGroup ({
    checkControl: new FormControl()
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private classesDmService: ClassesDmService
  ) { }

  ngOnInit() {
    this.classKey = this.activatedRoute.snapshot.params['id'];

    this.classesDmService.getClassById(this.classKey).valueChanges().subscribe( class_ => {
       this.verified = class_.verified;
    })

    
  }

} 
