import { Component, OnInit } from '@angular/core';
import { CatService } from 'client/app/services/cat.service';
import PetitionCtrl from 'server/controllers/petition';
import { Petition } from 'client/app/shared/models/petition.model';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {

  petitions: Petition[] = [];

  popularPetitions= [];
  constructor(private catService: CatService) { }

  ngOnInit() {
    this.getPetitions();
    // this.catService.getPetitions().subscribe(
    //   data => {
    //    data.forEach(pet =>{
    //       if(pet.category == 'Animals'){
    //           this.popularPetitions.push(
    //            { title: pet.title},
    //            { target: pet.target},
    //            { description: pet.description},
    //            { category: pet.category},
    //            { dateOfFiling: pet.username},
    //            { numberOfPeopleSigned: pet.numberOfPeopleSigned},
    //             {targetToBeAcheived: pet.numberOfPeopleSigned},
    //             {image :'./../../assets/register.jpg'}
    //           );
    //          // console.log(this.popularPetitions[0].image);
    //       }
    //     });
    //     //console.log(this.petitions); 
    //   });
      this.catService.getPetitions().subscribe(
        data =>{
          this.petitions = data;
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
     return petition.numberOfPeopleSigned/10;
      }
  


}
