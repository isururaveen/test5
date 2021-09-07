import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ShippingRegion } from "src/app/models/shipping-region";
import { Observable } from "rxjs";
import { Customer } from "src/app/models/customer";

@Injectable({
  providedIn: "root",
})
export class ShippingService {
  baseUrl = 'http://localhost:8080';
  url = localStorage.getItem("ServerUrl");
  constructor(private http: HttpClient) { }

  getShippingRegions(): Observable<ShippingRegion[]> {
    return this.http.get<ShippingRegion[]>(
      `${this.url}shipping/getShippingRegions`
    );
  }
  addnewShipping(customer: Customer): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.url}shipping/addnewShipping`,
      customer
    );
  }

  getaddress(email) {
    return this.http.post(this.baseUrl + '/api/address/getAddress',email);
  }

  postaddress(data) {
    return this.http.post(this.baseUrl + '/api/address/createAddress', data);
  }

  updateaddress(data) {
    return this.http.post(this.baseUrl + '/api/address/editAddress', data);
  }

  deleteaddress(id) {
    return this.http.post(this.baseUrl + '/api/address/deleteAddress', id);
  }


}
