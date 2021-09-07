import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Customer } from "src/app/models/customer";
import { CustomerService } from "src/app/services/Customer/customer.service";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
})
export class AccountComponent implements OnInit {
  //defining vraible for csutoerm classe
  loggedUser: Customer;
  shipping: any;
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit() {
    //getting data for logged user from local stroage
    this.loggedUser = JSON.parse(localStorage.getItem("user"));

    this.customerService.getShippDetailbyEmail(this.loggedUser).subscribe(
      (data) => {
        console.log(data[0]);
        this.shipping = data[0];
        //converting data to json string to store in locaal stoarge items
        //naviagte to products page
      },
      (error) => {}
    );
  }

  onSubmit() {
    this.customerService.UpdateShippingDetails(this.shipping).subscribe(
      (data) => {
        if (data) {
          alert("Update Sucessfull");
          this.router.navigate(["/products"]);
        }
        //converting data to json string to store in locaal stoarge items
        //naviagte to products page
      },
      (error) => {}
    );
  }
  onDelete(shipping: any) {
    console.log(shipping);
    this.customerService.DaleteShippingDetails(shipping).subscribe(
      (data) => {
        alert("Deleted Sucessfull");
        this.router.navigate(["/products"]);

        //converting data to json string to store in locaal stoarge items
        //naviagte to products page
      },
      (error) => {}
    );
  }
}
