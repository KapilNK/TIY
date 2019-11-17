import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
// import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login_validation_messages: any = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ]
  };

  successMessage: String = '';
  loginForm: FormGroup;
  constructor(private _myservice: MyserviceService,
    private _router: Router,
    private cookieService: CookieService,
    private _activatedRoute: ActivatedRoute) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl(null, Validators.required)
    });
  }
  ngOnInit() {

  }

  login() {
    // console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      this._myservice.login(this.loginForm.value)
        .subscribe(
          user => {
            //console.log(user.headers.get('set-cookie'));
            // console.log(user);
            localStorage.setItem('firstname', user.firstName);
            localStorage.setItem('email', user.email);
            localStorage.setItem('lastname', user.lastName);
            if (environment.production === true) {
              this.cookieService.set('access_token', user.token, 1, '/', environment.domain, true);
            } else {
              this.cookieService.set('access_token', user.token, 1, '/', environment.domain);
            }
            this._router.navigate(['/home']);
          },
          error => {
            //console.log("error", error);
            //debugger;
            this.successMessage = error.error.message || 'Internal Server Occur, Please try after Sometime.';
          }
        );
    }
  }

  movetoregister() {
    this._router.navigate(['../register'], { relativeTo: this._activatedRoute });
  }

  movetoforgotpassword() {
    this._router.navigate(['../forgetpass'], { relativeTo: this._activatedRoute });
  }

  // close() {
  //   this.matDialogRef.close();
  // }
}
