import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  login_validation_messages: any = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ]
  };

  successMessage: String = '';
  forgotpasswordForm: FormGroup;

  constructor(private _myservice: MyserviceService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {
    this.forgotpasswordForm = new FormGroup({
      email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }

  ngOnInit() {
  }

  forgotpassword() {
    // console.log(this.forgotpasswordForm.value);

    if (this.forgotpasswordForm.valid) {
      this._myservice.forgotpassword(this.forgotpasswordForm.value)
        .subscribe(
          data => {
            console.log("forgetPass data", data);
            this.successMessage = data.message || 'Successfully sent the message.'
          },
          error => {
            console.log("forgetPass data", error);
            debugger;
            this.successMessage = error.error.message || 'Internal Server Occur, Please try after Sometime.';
          }
        );
    }
  }

  movetoregister() {
    this._router.navigate(['../register'], { relativeTo: this._activatedRoute });
  }

  movetologin() {
    this._router.navigate(['../login'], { relativeTo: this._activatedRoute });
  }
}
