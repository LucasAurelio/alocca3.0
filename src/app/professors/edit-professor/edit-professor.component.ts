import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ProfessorsDmService } from '../../data-manager/professors/professors-dm.service';
import { Professor } from '../professor'
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-professor',
  templateUrl: './edit-professor.component.html',
  styleUrls: ['./edit-professor.component.css']
})
export class EditProfessorComponent implements OnInit {

  id: string;
  siap: string;
  name: string;
  nickname: string;

  constructor(
    private profDmService: ProfessorsDmService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id']
    this.profDmService.getProfessorById(this.id).valueChanges().subscribe( professor => {
        this.siap = professor.siap;
        this.name = professor.name;
        this.nickname = professor.nickname;
    });
  }

  saveInformation() {
    let professor = new Professor(this.siap, this.name, this.nickname);

    this.profDmService.existsChild('siap', this.siap).then( (exists) => {
      if (exists) { 
        this.snackBar.open("Esse professor (SIAP) já foi cadastrado.", null, {duration: 2500});
      } else {
        this.profDmService.existsChild("nickname", this.nickname).then( (exists) => {
          if (exists) {
            this.snackBar.open("Esse apelido já existe.", null, {duration: 2500});      
          } else {
            this.profDmService.updateProfessor(professor, this.id);
            this.snackBar.open("Informações atualizadas.", null, {duration: 2500});
            this.router.navigateByUrl('professors');
          }
        })
      }
    })
  }
}
