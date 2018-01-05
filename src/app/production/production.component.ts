import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authservice.service';
import {NotificationsService} from 'angular4-notify';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

@Component({
  templateUrl: 'production.component.html'
})
export class ProductionComponent implements OnInit {
  raws: any = [];
  products: any = [];
  chosentype: any = [];
  productitems: any = [];
  newproduct: any = {};
  showProduct: boolean = false;
  items: any = [];
  giveoutitems: any = [];
  newitems: any= {};
  addlist: any = [];
  showRaw: boolean = false;
  showProd: boolean = false;
  hidePanel: boolean = false;
  usages: any = [];
  searchRaw: string = '';
  searchProduct: string = '';
  rawTab: boolean = true;
  productTab: boolean = false;
  availqty: any = '';
  getdetails = false;
  getsubmitdetails = false;
  chosenitems: any = [];
  selecteditems: any = [];
  edititem: any = {};
  lastproduct: any = [];
  logindata: any = {};
  public returnModal;
  public submitModal;


   constructor(public alert: NotificationsService, public auth: AuthService, public router: Router) {
   }


  ngOnInit(): void {
    this.logindata = JSON.parse(sessionStorage.getItem('logindata'));
    //console.log(this.logindata.staff_id);
    if (!this.logindata.staff_id){
      this.router.navigate(['/']);
    }else{
      this.auth.getlastproduct().subscribe(results => {
        //console.log(results);
        this.lastproduct = results;
      }, err =>{
        this.alert.addError('Server error. Please try again');
      });
      this.auth.getRaw().subscribe(results => {
        //console.log(results);
        this.raws = results;
      }, err =>{
        this.alert.addError('Server error. Please try again');
      });
      this.auth.getProduct().subscribe(results => {
        this.products = results;
      }, err => {
        this.alert.addError('Server error. Please try again');
      });
    }
  }



  public getClass (perc_usage) {
    if (perc_usage <= 30){
      return "progress-bar bg-success";
    }else if (perc_usage <= 60){

      return "progress-bar bg-warning";
    }else{

      return "progress-bar bg-danger";
    }
  }

  public productClass(product_qty) {
    if (product_qty <= 30){
      return "progress-bar bg-danger";
    }else if (product_qty <= 60){

      return "progress-bar bg-warning";
    }else{

      return "progress-bar bg-success";
    }
  }

  public updateRaw(items) {
    this.auth.saveRaw(items).subscribe(results => {
      if(results.affectedRows === 1){
        //editModal.hide();
        document.getElementById('closeeditraw').click();
        this.ngOnInit();
        this.alert.addInfo("Update successful");
      }else{
        //editModal.hide();
        document.getElementById('closeeditraw').click();
        this.alert.addError('could not edit');
      }
    }, err =>{
      this.alert.addError('Server error. Please try again');
    })
  }

  public updateProduct(items) {
    this.auth.saveRaw(items).subscribe(results => {
      if(results.affectedRows === 1){
        //editModal.hide();
        document.getElementById('closeeditproduct').click();
        this.ngOnInit();
        this.alert.addInfo("Update successful");
      }else{
        //editModal.hide();
        document.getElementById('closeeditproduct').click();
        this.alert.addError('could not edit');
      }
    }, err =>{
      this.alert.addError('Server error. Please try again');
    })
  }

  public addRaw(newitems) {
    //console.log(newitems);
    newitems.username = 'Admin';
    this.auth.saveRaw(newitems).subscribe(results => {
      //console.log(results)
      //if(results.affectedRows === 1){
        //editModal.hide();
        document.getElementById('hidenew').click();
        this.ngOnInit();
        this.alert.addInfo("Added successfully");
        this.newitems = {};
      //}else{
        //editModal.hide();
      //  document.getElementById('hidenew').click();
      //  this.alert.addError('could not add');
    //  }
    }, err =>{
      this.alert.addError('Server error. Please try again');
    })
  }



  public deleteRaw(items) {
    this.auth.deleteRaw(items).subscribe(results=>{
      if(results.affectedRows === 1){
        //editModal.hide();
        this.closeRaw();
        this.ngOnInit();
        this.alert.addInfo("Deleted successful");

      }else{
        //editModal.hide();
        this.alert.addError('could not delete item');
      }
    }, err=>{
      this.alert.addError('Server error. Please try again');
    })
  }

  public deleteProduct(items) {
    this.auth.deleteRaw(items).subscribe(results=>{
      if(results.affectedRows === 1){
        //editModal.hide();
        this.closeProd();
        this.ngOnInit();
        this.alert.addInfo("Deleted successful");

      }else{
        //editModal.hide();
        this.alert.addError('could not delete item');
      }
    }, err=>{
      this.alert.addError('Server error. Please try again');
    })
  }

  public closeRaw(){
    this.hidePanel = false;
    this.showRaw = false;
    this.productTab = false;
    this.rawTab = true;
  }

  public closeProd(){
    this.hidePanel = false;
    this.showProd = false;
    this.productTab = true;
    this.rawTab = false;
  }

  public showDetails(raw){
    //console.log(raw.id);

    this.items=raw;
    this.hidePanel = true;
    this.showRaw = true;
    this.auth.getUsage(raw.id).subscribe(results=>{
      //console.log(results);
      this.usages = results;
    }, err=>{
      this.alert.addError('Server error. Please try again');
    })
  }

  public showProductDetails(product){
    this.hidePanel = true;
    this.showProd = true;
    this.productitems=product;
    this.auth.getUsage(product.id).subscribe(results=>{
      this.usages = results;
    }, err=>{
      this.alert.addError('Server error. Please try again');
    })
  }

  public getlistType(listtype){
    console.log(listtype);
    if (listtype){
      this.chosentype = this.raws;
    }else{
      this.chosentype = this.products;
    }
  }

  public addnewitem(item) {
    this.availqty = (item.received_qty - item.total_given);
    console.log(item);
  }
  public next(){
    this.getdetails = true;
  }

  public previous(){
    this.getdetails = false;
  }

  public submitnext(){
    this.getsubmitdetails = true;
  }

  public submitprevious(){
    this.getsubmitdetails = false;
  }

  public addchosen(item, event){
    if (event.target.checked){
      this.chosenitems.push(item);
    }else{
      var index = this.chosenitems.indexOf(item.id);
      this.chosenitems.splice(index, 1);
    }
  }

  public addselected(item, event){
    if (event.target.checked){
      this.selecteditems.push(item);
    }else{
      var index = this.selecteditems.indexOf(item.id);
      this.selecteditems.splice(index, 1);
    }
  }

  public placerequest(){
    console.log(this.chosenitems);
    var timestamp = new Date().getUTCMilliseconds();
    console.log(timestamp)
    this.chosenitems.forEach(function (eachobj){
      eachobj.given_to = this.logindata.staff_id;
      eachobj.stafftype = this.logindata.department;
      eachobj.request_id = timestamp;
      this.auth.requestraw(eachobj).subscribe(results=>{
        var index = this.chosenitems.indexOf(eachobj.id);
        this.chosenitems.splice(index, 1);
        //this.usages = results;
      }, err=>{
        this.alert.addError('Server error. Please try again');
      })
    }, this);
      this.chosenitems = [];
      this.getdetails = false;
      document.getElementById('hidegiveout').click();
      this.ngOnInit();
      this.alert.addInfo("Request made successful");

  }

  public placesubmission(){
    console.log(this.selecteditems);
    var timestamp = new Date().getUTCMilliseconds();
    console.log(timestamp)
    this.selecteditems.forEach(function (eachobj){
      eachobj.received_from = this.logindata.staff_id;
      eachobj.request_id = timestamp;
      if (!eachobj.remarks){
        eachobj.remarks = 'Ok';
      }
      this.auth.submitproduct(eachobj).subscribe(results=>{
        //console.log(eachobj);
        console.log(results);
        var index = this.selecteditems.indexOf(eachobj.id);
        this.selecteditems.splice(index, 1);
        //this.usages = results;
      }, err=>{
        this.alert.addError('Server error. Please try again');
      })
    }, this);

      this.selecteditems = [];
      this.getsubmitdetails = false;
      document.getElementById('hidesubmit').click();
      this.ngOnInit();
      this.alert.addInfo("Product submitted successfully");
  }

  /*public notify(notifytext, subject){ //our function to be called on click
    let options = { //set options
      body: notifytext,
      icon: "assets/img/logo.png" //adding an icon
    }
    let notify = this.alert.create(subject, options).subscribe( res =>{
        ; console.log(res)
      },err =>{
           console.log(err)
        });
  }*/

  public requestraw(){
    this.returnModal.show();
  }
}
