import { Component, OnInit } from "@angular/core";
import { CartProduct } from "src/app/models/cart-product";
import { Customer } from "src/app/models/customer";

@Component({
  selector: "app-review",
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.scss"],
})
export class ReviewComponent implements OnInit {
  ///deignition checkout prodct variable for cart prodct array object
  checkoutProducts: CartProduct[];
  customerInfor: Customer = new Customer();

  //dintion
  totalPrice: number = 0;
  constructor() {
    const products = JSON.parse(localStorage.getItem("Cart"));
    this.customerInfor = JSON.parse(localStorage.getItem("user"));

    console.log(products);
    this.checkoutProducts = products;
    products.forEach((product) => {
      console.log(product);

      this.totalPrice += product.Price * product.Quantity;
    });
  }

  ngOnInit() {}
}
