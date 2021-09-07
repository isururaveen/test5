import { Component, OnInit } from "@angular/core";
import { CartProduct } from "src/app/models/cart-product";

@Component({
  selector: "app-payment-info",
  templateUrl: "./payment-info.component.html",
  styleUrls: ["./payment-info.component.scss"],
})
export class PaymentInfoComponent implements OnInit {
  //create object for car product array
  checkoutProducts: CartProduct[];
  //define total price
  totalPrice: number = 0;
  //defining data
  date: number;
  //defining tax
  tax = 6.4;
  remark: string = "";
  constructor() {
    //getting product for cart local storage item
    const products = JSON.parse(localStorage.getItem("Cart"));
    //intializing checkout products
    this.checkoutProducts = products;
    //looping through prodctus and get each product
    products.forEach((product) => {
      //calaute total price
      this.totalPrice += product.Price * product.Quantity;
    });
  }

  ngOnInit() {}
}
