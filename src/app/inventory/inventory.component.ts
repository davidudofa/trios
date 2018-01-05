import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authservice.service';
import {NotificationsService} from 'angular4-notify';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

@Component({
  templateUrl: 'inventory.component.html'
})
export class InventoryComponent implements OnInit {
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
  chosenitems: any = [];
  edititem: any = {};
  logindata: any = {};
  public deleteModal;
  public editModal;
  public addModal;


   constructor(public alert: NotificationsService, public auth: AuthService, public router: Router ) { }


  ngOnInit(): void {
    this.logindata = JSON.parse(sessionStorage.getItem('logindata'));
    //console.log(this.logindata.staff_id);
    if (!this.logindata.staff_id){
      this.router.navigate(['/']);
    }else{
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
    items.staff_id = this.logindata.staff_id;
    this.auth.saveRaw(items).subscribe(results => {
      if(results.affectedRows === 1){
        //editModal.hide();
        document.getElementById('hideedit').click();
        this.ngOnInit();
        this.alert.addInfo("Update successful");
      }else{
        //editModal.hide();
        document.getElementById('hideedit').click();
        this.alert.addError('could not edit');
      }
    }, err =>{
      this.alert.addError('Server error. Please try again');
    })
  }

  public updateProduct(items) {
    items.staff_id = this.logindata.staff_id;
    this.auth.saveRaw(items).subscribe(results => {
      if(results.affectedRows === 1){
        //editModal.hide();
        document.getElementById('hideedit').click();
        this.ngOnInit();
        this.alert.addInfo("Update successful");
      }else{
        //editModal.hide();
        document.getElementById('hideedit').click();
        this.alert.addError('could not edit');
      }
    }, err =>{
      this.alert.addError('Server error. Please try again');
    })
  }

  public addRaw(newitems) {
    //console.log(newitems);
    newitems.username = this.logindata.staff_id
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
    items.staff_id = this.logindata.staff_id;
    this.auth.deleteRaw(items).subscribe(results=>{
      if(results.affectedRows === 1){
        //editModal.hide();
        document.getElementById('hidedelete').click();
        this.ngOnInit();
        this.alert.addInfo("Deleted successful");

      }else{
        document.getElementById('hidedelete').click();
        this.alert.addError('could not delete item');
      }
    }, err=>{
      this.alert.addError('Server error. Please try again');
    })
  }

  public deleteProduct(items) {
    items.staff_id = this.logindata.staff_id;
    this.auth.deleteRaw(items).subscribe(results=>{
      if(results.affectedRows === 1){
        //editModal.hide();
        document.getElementById('hidedelete').click();
        this.ngOnInit();
        this.alert.addInfo("Deleted successful");

      }else{
        document.getElementById('hidedelete').click();
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

  public addchosen(item, event){
    if (event.target.checked){
      this.chosenitems.push(item);
    }else{
      var index = this.chosenitems.indexOf(item.id);
      this.chosenitems.splice(index, 1);
    }
  }

  public placerequest(){
    console.log(this.chosenitems);
    /// for each chosenitems add staffid, stafftype, generate requestid
  }
}
