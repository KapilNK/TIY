import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Contactus } from './contactus';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  contactus: Contactus;
  contactusform: FormGroup;
  successMessage: String = '';

  constructor(private fb: FormBuilder, private contactusService: ContactService) {
    this.contactus = new Contactus();
  }

  ngOnInit() {
    this.contactusform = this.fb.group({
      yourname: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.email),
      subject: new FormControl(null, Validators.required),
      message: new FormControl(null, Validators.required)
    });
  }
  isValid(controlName) {
    return this.contactusform.get(controlName).invalid && this.contactusform.get(controlName).touched;
  }

  sendContact() {
    if (this.contactusform.valid) {
      this.contactusService.sendContactInfo(this.contactusform.value)
        .subscribe(
          data => {
            this.successMessage = 'Successfully Submitted Your details.'
          },
          error => this.successMessage = error.error.message || 'Internal Server Occur, Please try again after Sometime.'
        );
    }
  }


}
