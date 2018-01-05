import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  doLogin(logindata){
    console.log(logindata);
    return this.http.post('/api/login/', logindata)
      .map(res => res.json());
  }

  getRaw(){
    return this.http.get('/api/raw/').map(res=> res.json());
  }

  getActivity(){
    return this.http.get('/api/activity/').map(res=> res.json());
  }
  getProduct(){
    return this.http.get('/api/product/').map(res=> res.json());
  }

  saveRaw(items){
      if (items.id){
        return this.http.put('/api/raw/'+items.id, items)
                .map(res => res.json());
      }else{
        return this.http.post('/api/product/', items)
          .map(res => res.json());
      }
  }

  saveProduct(items){
      if (items.id){
        return this.http.put('/api/product/'+items.id, items)
                .map(res => res.json());
      }else{
        return this.http.post('/api/product/', items)
          .map(res => res.json());
      }
  }

  deleteRaw(items){
    return this.http.delete('/api/raw/'+items.id)
                .map(res => res.json());
  }

  deleteProduct(items){
    return this.http.delete('/api/product/'+items.id)
                .map(res => res.json());
  }

  getUsage(itemid){
    return this.http.get('api/usage/'+itemid).map(res => res.json());
  }

  saveoutinventory(items){
    return this.http.post('api/newout/', items).map(res => res.json());
  }
  getlastproduct(){
    return this.http.get('api/lastproduct/').map(res=>res.json());
  }

  requestraw(itemarray){
    return this.http.post('api/requestraw/', itemarray).map(res=>res.json());
  }

  submitproduct(itemarray){
    return this.http.post('api/submitproduct/', itemarray).map(res=>res.json());
  }

}
