import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyserviceService } from '../myservice.service';

import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls:
    [
      './header.component.css'
    ],
})
export class HeaderComponent implements OnInit {

  loggedInUser: String = '';
  constructor(private myService: MyserviceService,
    private cookieService: CookieService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loggedInUser = localStorage.getItem('firstname');
  }

  movetologin() {
    this._router.navigate(['/login'], { relativeTo: this._activatedRoute });
  }

  isAuthenticated(): boolean {
    return this.myService.isAuthenticated();
  }

  openModal() {
    if (this.isAuthenticated()) {
      this._router.navigate(['/addpost'], { relativeTo: this._activatedRoute });
    } else {
      this._router.navigate(['/login'], { relativeTo: this._activatedRoute });
    }
  }
  openLoginModal() {
    this._router.navigate(['/login'], { relativeTo: this._activatedRoute });
  }

  // openmaterialLoginModal() {
  //   this.matdialog.open(LoginComponent, {
  //     height: '500px',
  //     width: '500px',
  //     autoFocus: true, disableClose: true
  //   });
  // }

  logout() {
    this.myService.logout(localStorage.getItem('email'))
      .subscribe(
        data => {
          //console.log('logout',data);
        },
        error => {
          // console.log("error",error.error.message); 

        }
      );
    localStorage.removeItem('firstname');
    localStorage.removeItem('email');
    localStorage.removeItem('lastname');
    this.cookieService.delete('access_token');
    this._router.navigate(['/home']);
  }
}
