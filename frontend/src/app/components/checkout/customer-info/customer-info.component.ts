import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Customer } from "src/app/models/customer";
import { CustomerService } from "src/app/services/Customer/customer.service";
import { ShippingService } from "src/app/services/Shipping/shipping.service";


@Component({
  selector: "app-customer-info",
  templateUrl: "./customer-info.component.html",
  styleUrls: ["./customer-info.component.scss"],
})
export class CustomerInfoComponent implements OnInit {
  //create vriable for customer class
  customerInfor: Customer = new Customer();
  shipping: any;
  adresses : any;
  div1:boolean=false;
  loggedUser: Customer;
  editAddress :any;
  email = {'email': ''};
  id = {'id': ''};
  shipping_id :any;
  address : address = new address();
  errorMsg :ErrorMsg = new ErrorMsg();

  constructor(
    private shippingService: ShippingService,
    private customerService: CustomerService,
    private router: Router
     ) {}


  div1Function(){
    this.div1=true;
   }


  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem("user"));
console.log(this.loggedUser)
this.address.email=this.loggedUser.Email;
    this.getAddress();
    //getting user data from local storage
    this.customerInfor.AddressOne = "";
    this.customerInfor.AddressTwo = "";
    this.customerInfor.Country = "";
    this.customerInfor.Town = "";
    this.customerInfor.ZipCode = "";
    this.customerService.getShippDetailbyEmail(this.customerInfor).subscribe(
      (data) => {
        this.shipping = data[0];
        this.customerInfor.AddressOne = this.shipping.address_1;
        this.customerInfor.AddressTwo = this.shipping.address_2;
        this.customerInfor.Country = this.shipping.country;
        this.customerInfor.Town = this.shipping.city;
        this.customerInfor.ZipCode = this.shipping.postal_code;
        //converting data to json string to store in locaal stoarge items
        //naviagte to products page
      },
      (error) => {}
    );
  }

  onclickradio(id){
    console.log(id);
    this.shipping_id = id;
// Put the object into storage
console.log(id)

    localStorage.setItem('shipping_id', JSON.stringify(this.shipping_id));
  }


  getAddress(){
    if(this.loggedUser !=null){
      this.email.email = this.loggedUser.Email;
      console.log(this.email);
    this.shippingService.getaddress(this.email).subscribe(res=>{
    this.adresses = res;
    console.log(this.adresses);
    },error=>{
      console.log(error);
    })
  }else{
    this.router.navigate(["/login"]);
    console.log('error');
  }
    }
 
    onNext(){
      if(this.loggedUser !=null){
        this.router.navigate(["/checkout/payment-information"]);
      }else{
        this.router.navigate(["/login"]);
        console.log('error');
      }
    }

    onSave(){
      if(this.loggedUser !=null){
        this.errorMsg.address_1 = this.errorMsg.address_2 = this.errorMsg.city = this.errorMsg.country = this.errorMsg.email = this.errorMsg.postal_code ='';
        !this.address.address_1 ? this.errorMsg.address_1 ='Address 1 is required': '';
        !this.address.address_2 ? this.errorMsg.address_2 ='Address 2 is required': '';
        !this.address.city ? this.errorMsg.city ='City is required': '';
        !this.address.country ? this.errorMsg.country ='Country is required': '';
        !this.address.email ? this.errorMsg.email ='Email is required': '';
        !this.address.postal_code? this.errorMsg.postal_code='Posatal code is Required': '';
        if (!this.address.address_1 || !this.address.address_2  || !this.address.city || !this.address.country || !this.address.email || !this.address.postal_code){
          return ;
        }
    
        this.shippingService.postaddress(this.address).subscribe(res=>{
          this.getAddress();
          this.div1=false;
          console.log(res);
          this.router.navigate(["/checkout/customer-information"]);
        },error=>{
          this.router.navigate(["/checkout/customer-information"]);
          console.log(error);
          console.log('Error');
        })

      }else{
        this.router.navigate(["/login"]);
        console.log('error');
      }

    }
   




    onDelete(shipping_id){
      this.id.id = shipping_id;
      this.shippingService.deleteaddress(this.id).subscribe(res=>{
      this.getAddress();
      this.router.navigate(["/checkout/customer-information"]);
      },error=>{
      console.log(error);
      this.getAddress();
      this.router.navigate(["/checkout/customer-information"]);
      console.log('Error');
      })
      }


     

  onSubmit() {
    //updating locall storage
    if (this.customerInfor != null) {
      localStorage.setItem("user", JSON.stringify(this.customerInfor));
      //calling add customer function for custoemr services to insert customer record
      console.log(this.customerInfor);
      if (
        this.customerInfor.AddressOne != "" &&
        this.customerInfor.AddressTwo != "" &&
        this.customerInfor.Country != "" &&
        this.customerInfor.ZipCode != ""
      ) {
        this.router.navigate(["/checkout/payment-information"]);
      } else {
        alert("Add ALL Details First");
      }
      // this.customerService.addnewShipping(this.customerInfor).subscribe((a) => {
      // if (a) {
      //navigate to custoemr login page
      // }
      // });
    }
  }
}

class address{ 
  address_1: String;
  address_2: String;
  city: String;
  country: String;
  email: String;
  postal_code: String;
}

class ErrorMsg{ 
  address_1: String;
  address_2: String;
  city: String;
  country: String;
  email: String;
  postal_code: String;
}