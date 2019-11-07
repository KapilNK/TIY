import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  successMessage: String = '';
  resetpForm: FormGroup;
  constructor(private _myservice: MyserviceService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {
    this.resetpForm = new FormGroup({
      email: new FormControl(null, Validators.email),
      password: new FormControl(null, Validators.required),
      cnfpass: new FormControl(null, this.passValidator),
      num: new FormControl('')
    });
    this.resetpForm.controls.password.valueChanges
      .subscribe(
        x => this.resetpForm.controls.cnfpass.updateValueAndValidity()
      );
  }

  ngOnInit() {
    debugger;
    const email: string = this._activatedRoute.snapshot.queryParams.email || '';
    const num: string = this._activatedRoute.snapshot.queryParams.num || '';
    this.resetpForm.controls["email"].setValue(email);
    this.resetpForm.controls["num"].setValue(num);
  }

  isValid(controlName) {
    return this.resetpForm.get(controlName).invalid && this.resetpForm.get(controlName).touched;
  }

  passValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
      const cnfpassValue = control.value;

      const passControl = control.root.get('password');
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== cnfpassValue || passValue === '') {
          return {
            isError: true
          };
        }
      }
    }

    return null;
  }

  resetpassword() {
    if (this.resetpForm.valid) {
      this._myservice.submitresetp(this.resetpForm.value)
        .subscribe(
          data => {//console.log("register data",data);
            this.successMessage = 'password reset Success.'
          },
          error => { this.successMessage = error.error.message || 'Internal Server Occur, Please try after Sometime.'; }
        );
    }
  }

  movetologin() {
    this._router.navigate(['../login'], { relativeTo: this._activatedRoute });
  }
}
