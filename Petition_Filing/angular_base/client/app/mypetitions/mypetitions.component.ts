import { Component, OnInit } from '@angular/core';
import { CatService } from 'client/app/services/cat.service';
import PetitionCtrl from 'server/controllers/petition';
import { Petition } from 'client/app/shared/models/petition.model';
import { AuthService } from '../services/auth.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-mypetitions',
  templateUrl: './mypetitions.component.html',
  styleUrls: ['./mypetitions.component.scss']
})
export class MypetitionsComponent implements OnInit {

  petitions: Petition[] = [];

  constructor(private catService: CatService, public auth: AuthService,public toast: ToastComponent) { }

  ngOnInit() {
    //this.getPetitions();
    this.catService.getPetitions().subscribe(
      data => {
        this.petitions = data.filter(pet => pet.username == this.auth.currentUser.email);
        if(!this.petitions){
          this.toast.setMessage('invalid email or password!', 'danger')
        }
        console.log(this.petitions); 
      });
    
  }

  getPetitions(){
    this.catService.getPetitions().subscribe(
    data => {
      this.petitions = data;
      console.log(this.petitions);
    });
      // error => console.log(error)
    
    
  }

  calProgress(petition){
    console.log(petition.numberOfPeopleSigned);
     return petition.numberOfPeopleSigned;
      }
  


}
