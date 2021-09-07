import { Component, OnInit, Input } from "@angular/core";
import { ICreateOrderRequest, IPayPalConfig } from "ngx-paypal";
import { Router } from "@angular/router";
import { CartProduct } from "src/app/models/cart-product";
import { CheckoutService } from "src/app/services/Checkout/checkout.service";
import { OrderDetail } from "src/app/models/order-detail";
import { Customer } from "src/app/models/customer";

@Component({
  selector: "app-paypal-checkout",
  templateUrl: "./paypal-checkout.component.html",
  styleUrls: ["./paypal-checkout.component.scss"],
})
export class PaypalCheckoutComponent implements OnInit {
  ///intial toal ammount
  totalAmounts: number = 0;
  //intializing total amount input
  @Input() totalAmount: number = 0;
  //intializing comments input
  @Input() comments: string;

  shipping_id :any;

  //intializing tcu
  currency: string = "USD";
  //defning obj cart variable
  cart: CartProduct[] = [];
  //defning obj productlist
  productList: any[] = [];
  //defning user obj for Customer closs
  user: Customer;
  constructor(
    private router: Router,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit() {
    //geting cart data from local storage
    this.cart = JSON.parse(localStorage.getItem("Cart"));
    //getting user data from local storage
    this.user = JSON.parse(localStorage.getItem("user"));
    //getting product from local stoarage
    const products = JSON.parse(localStorage.getItem("Cart"));

    this.shipping_id=JSON.parse(localStorage.getItem("shipping_id"));
console.log(this.user)
    //looping throug products array object and get single object
    products.forEach((product) => {
      //calculating total amount from product price and quantity
      this.totalAmounts += product.Price * product.Quantity;
    });
    //looping through cart and get eah product
    this.cart.forEach((element) => {
      //push each product in product list
      this.productList.push({
        //name
        name: element.Name,
        //quantity
        quantity: element.Quantity,
        //cateory
        category: `${element.DepartmentName} - ${element.CategoryName}`,
        //unit amout with currency
        unit_amount: {
          currency_code: `${this.currency}`,
          value: `${element.Price}`,
        },
      });
    });
    const self = this;

    //Makin an object od Order details
    let orderData: OrderDetail = {
      // intiliztion cart
      Cart: this.cart,
      //initcallizing user
      User: this.user,
      //intilizing Remartd
      Shipping_id:this.shipping_id,

      Remarks: "order",
      //initlizing total amount
      TotalAmount: this.totalAmounts,
    };

    //calling checkout service to strore
    self.checkoutService.CreateOrderTransacton(orderData).subscribe((data) => {
      console.log(data);
      //clearing cart local storeage
      localStorage.removeItem("Cart");
      //navige to route
      self.router.navigate(["/order/order-confirmation"]);
    });
    // this.initConfig();
  }
}
