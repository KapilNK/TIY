import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  username = '';
  constructor(private myService:MyserviceService,
  private _router: Router,
  private cookieService: CookieService) { 
    this.username = localStorage.getItem('firstname');
    /* this.myService.getUserName()
    .subscribe(
      data => this.username= data.toString(),
      error => this._router.navigate(['/main/login'])
    ) */
  }

  ngOnInit() {
  }

  logout(){
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
    this._router.navigate(['/login']);
  }
}
