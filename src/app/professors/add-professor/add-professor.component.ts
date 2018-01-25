import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Professor } from '../professor'
import { ProfessorsDmService } from '../../data-manager/professors/professors-dm.service';

@Component({
  selector: 'app-add-professor',
  templateUrl: './add-professor.component.html',
  styleUrls: ['./add-professor.component.css']
})

export class AddProfessorComponent implements OnInit {

  static readonly  REQUIRED_FIELD_ERROR_MSG = 'Campo obrigatório';
  static readonly  MIN_LENGTH_ERROR_MSG = 'Não possui 7 dígitos';

  siap: number;
  name: string;
  nickname: string;
  
  constructor(private ProfDmService: ProfessorsDmService) { }

  ngOnInit() {
  }

  siapControl = new FormControl('', [Validators.required, Validators.maxLength(7), Validators.pattern("[0-9]")]);
  nameControl = new FormControl('', [Validators.required]);
  nicknameControl =  new FormControl('', [Validators.required]);


  // Só funciona se o erro for required. Não funciona para os outros tipos de erros. Investigar esta merda.
  getErrorMessage(control: FormControl) {
    return control.hasError('required') ? AddProfessorComponent.REQUIRED_FIELD_ERROR_MSG :
           control.hasError('minlength') ? AddProfessorComponent.MIN_LENGTH_ERROR_MSG : 
            '';
  }

  saveProfessor() {
    let professor = new Professor(this.siap, this.name, this.nickname);
    this.ProfDmService.saveProfessor(professor);
  }

}
