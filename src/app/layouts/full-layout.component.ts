import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {

  admin:boolean = false;
  inventory:boolean = false;
  production:boolean = false;
  marketing:boolean = false;
  accounts:boolean = false;

   constructor(private router: Router ) { }

  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};
  logindata: any = {};

  public toggled(open: boolean): void {
    //console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {
    this.logindata = JSON.parse(sessionStorage.getItem('logindata'));
    //console.log(this.logindata.staff_id);
    if (!this.logindata.staff_id){
      this.router.navigate(['/']);
    }else{
      switch(this.logindata.department) {
          case "Admin":
            this.admin = true;
            break;
          case "Inventory":
            this.inventory = true;
            break;
          case "Production":
            this.production = true;
            break;
          case "Marketing":
            this.marketing = true;
            break;
          case "Accounts":
            this.accounts = true;
            break;
          default:
            this.router.navigate(['/']);
      }
    }
  }

  public doLogout(){
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
