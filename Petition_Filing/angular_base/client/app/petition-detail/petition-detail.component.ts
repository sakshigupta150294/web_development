import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatService } from '../services/cat.service';
import { Petition } from 'client/app/shared/models/petition.model';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-petition-detail',
  templateUrl: './petition-detail.component.html',
  styleUrls: ['./petition-detail.component.scss']
})
export class PetitionDetailComponent implements OnInit {

  petitionId = null;
  petitions: Petition[] = [];
  petition: Petition;
  user= null;
  constructor(private route: ActivatedRoute, private catService: CatService,
    public toast: ToastComponent, public auth: AuthService,
     private router: Router) { }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.petitionId = params.get("_id")
    });
    console.log("petitionId:" +this.petitionId);
    this.catService.getPetition(this.petitionId).subscribe(
      data =>{
        //this.petitions.push(data);
        this.petition = data;
        console.log("clicked petition: "+this.petition);
      }
    );
    this.user = this.auth.currentUser.username;
  }

  voteForPetition(petObj: Petition){
    if(this.auth.loggedIn){
    console.log(petObj.numberOfPeopleSigned);
    //petObj.numberOfPeopleSigned = petObj.numberOfPeopleSigned++;
    this.petition.numberOfPeopleSigned +=1;  
    this.updatePetitionSigners(this.petition);
  }else{
   // this.openModal(testModal);
   this.toast.setMessage('Please login to sign a Petition!!','danger');
    this.router.navigate(['/login']);
  }
  }

  // openModal(testModal: any) {
  //   this.modalService.open(testModal, {centered: true}).result.then((result) => {
  //     if (result === 'yes') {
  //       this.router.navigate(['/login']);
  //     } else {
  //       console.log('no');
  //     }
  //   });
  // }

  updatePetitionSigners(petObj: Petition) {
      this.catService.updatePetitionSigners(petObj).subscribe(
        (res) => {
          //this.isEditing = false;
          //this.cat = cat;
          this.toast.setMessage('Successfully signed!!','success');
         // this.router.navigate(['/browse-petitions/popular']);

        },
        error => console.log(error)
      );
    }

}
