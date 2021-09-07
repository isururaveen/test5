
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AddressServiceService {

  constructor(private http: HttpClient) { }
  baseUrl ='http://localhost:8080';

  get(){
    return this.http.get(this.baseUrl+ '/api/address/getAddress'); }

  post(data){
    return this.http.post(this.baseUrl+ '/api/address/createAddress', data);}

  update(data){
    return this.http.post(this.baseUrl+ '/api/address/editAddress', data);}
    
  delete(id){
    return this.http.post(this.baseUrl+ '/api/address/deleteAddress', id);}
}
