import { Component } from '@angular/core';
//import { LoginService, LoginData } from '../services/loginservice';
import { Router } from '@angular/router';
import { AuthService } from '../authservice.service';
import {NotificationsService} from 'angular4-notify';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  logindata = {username: '', userhash: ''};
  userdata: any = {};
  constructor(public router: Router, public authservice: AuthService, public alert: NotificationsService) { }

  public dologin(logindata){
    //console.log(logindata);
    if (!logindata.username){
      this.alert.addError('username empty');
    }else if (!logindata.userhash){
      this.alert.addError('username empty');
    }else{
      this.authservice.doLogin(logindata).subscribe(results=> {
        //console.log(results[0]);
        if (results){
          //console.log(results[0].department);
          sessionStorage.setItem('logindata', JSON.stringify(results[0]));
          this.alert.addInfo('login success');
          this.router.navigate(['/dashboard']);

        }else{
          this.alert.addError('Invalid Login details');
        }
      }, err => {
        this.alert.addError('Invalid Login details '+err);
      });
    }
    /*this.loginservice.doLogin(logindata).subscribe(
                                results => {
                                    //console.log(results);
                                },
                                err => {
                                    // Log errors if any
                                    //console.log(err);
                                });*/
  }

  ngOnInit(): void {
    this.userdata = JSON.parse(sessionStorage.getItem('logindata'));
    //console.log(this.userdata.staff_id);
    if (this.userdata.staff_id){
      this.router.navigate(['/dashboard']);
    }
  }

}
