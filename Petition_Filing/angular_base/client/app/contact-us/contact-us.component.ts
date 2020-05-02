import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor(              public toast: ToastComponent    ) { }

  ngOnInit() {
  }

  contact() {
 
        this.toast.setMessage('Your form has been submitted successfully!!', 'success');
  }

 // register() {
 //   this.register(this.registerForm.value).subscribe(
 //     res => {
 //       this.toast.setMessage('You successfully registered!', 'success');
 //       this.router.navigate(['/login']);
 //     },
 //     error => this.toast.setMessage('email id or username already exists', 'danger')
  //  );
 // }
//}
}
