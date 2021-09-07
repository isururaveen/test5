import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { Customer } from "src/app/models/customer";
import { CustomerService } from "src/app/services/Customer/customer.service";
import { ShippingService } from "src/app/services/Shipping/shipping.service";

@Component({
  selector: 'app-edit-shippinginfo',
  templateUrl: './edit-shippinginfo.component.html',
  styleUrls: ['./edit-shippinginfo.component.scss']
})
export class EditShippinginfoComponent implements OnInit {
 //create vriable for customer class
 customerInfor: Customer = new Customer();
 shipping: any;
 editShipping :any;
 adresses : any;
 div1:boolean=false;
 loggedUser: Customer;
 id = {'id': ''};
// email = {'email': ''};
email = {'email': ''};
 address : address = new address();
 errorMsg :ErrorMsg = new ErrorMsg();
 private routeSub: Subscription;
 constructor(
  private shippingService: ShippingService,
  private customerService: CustomerService,
  private route: ActivatedRoute,
  private router: Router
   ) {}

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem("user"));
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getAddress();
    });
  }

  getAddress(){
    if(this.loggedUser !=null){
      this.email.email = this.loggedUser.Email;
      console.log(this.email);
    this.shippingService.getaddress(this.email).subscribe(res=>{
    length = Object.keys(res).length;
    for (let i = 0; i < length; i++) {
      if(res[i].shipping_id == this.id){
        this.editShipping = res[i];
      } 
    }
    console.log(this.editShipping);
    },error=>{
      console.log(error);
    })
  }else{
    this.router.navigate(["/login"]);
    console.log('error');
  }
  }


  onUpdate(){
    console.log('clicked here');
    if(this.loggedUser !=null){
    this.shippingService.updateaddress(this.editShipping).subscribe(res=>{
      console.log('Success');
      this.router.navigate(['/checkout/customer-information']);
      },error=>{
      console.log(error);
      console.log('Error');
      })
    }else{
      this.router.navigate(["/login"]);
      console.log('error');
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