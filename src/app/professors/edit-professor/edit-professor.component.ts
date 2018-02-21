import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ProfessorsDmService } from '../../data-manager/professors/professors-dm.service';
import { Professor } from '../professor'
import { MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-professor',
  templateUrl: './edit-professor.component.html',
  styleUrls: ['./edit-professor.component.css']
})
export class EditProfessorComponent implements OnInit {

  static readonly  REQUIRED_FIELD_ERROR_MSG = 'Campo obrigatório';
  static readonly  MIN_LENGTH_ERROR_MSG = 'Não possui 7 dígitos';

  id: string;
  siape: string;
  name: string;
  nickname: string;
  originalsiape:string; 
  originalNickname: string;

  constructor(
    private profDmService: ProfessorsDmService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router 
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id']
    this.profDmService.getProfessorById(this.id).valueChanges().subscribe( professor => {
        this.siape = professor.siape;
        this.name = professor.name;
        this.nickname = professor.nickname;
        this.originalsiape = professor.siape;
        this.originalNickname = professor.nickname;
    });
  }

  siapeControl = new FormControl('', [Validators.required, Validators.maxLength(7), Validators.pattern("[0-9]")]);
  nameControl = new FormControl('', [Validators.required]);
  nicknameControl =  new FormControl('', [Validators.required]);

  // Só funciona se o erro for required. Não funciona para os outros tipos de erros. Investigar esta merda.
  getErrorMessage(control: FormControl) {
    return control.hasError('required') ? EditProfessorComponent.REQUIRED_FIELD_ERROR_MSG :
           control.hasError('minlength') ? EditProfessorComponent.MIN_LENGTH_ERROR_MSG : 
            '';
  }

  saveInformation() {
    let professor = new Professor(this.siape, this.name, this.nickname);
    
    this.profDmService.existChild('siape', this.siape).then( (exists) => {
      if (exists && this.siape != this.originalsiape) { 
        this.snackBar.open("Esse professor (siape) já foi cadastrado", null, {duration: 2500});
      } else {
        this.profDmService.existChild("nickname", this.nickname).then( (exists) => {
          if (exists && this.nickname!= this.originalNickname) {
            this.snackBar.open("Esse apelido já existe", null, {duration: 2500});      
          } else {
            this.profDmService.updateProfessor(professor, this.id);
            this.snackBar.open("Informações atualizadas", null, {duration: 2500});
            this.router.navigateByUrl('professors');
          }
        })
      }
    })
  }
}
