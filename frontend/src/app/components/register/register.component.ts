import { Component, OnInit } from "@angular/core";
import { ShippingService } from "src/app/services/Shipping/shipping.service";
import { ShippingRegion } from "src/app/models/shipping-region";
import { Customer } from "src/app/models/customer";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CustomerService } from "src/app/services/Customer/customer.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  //creating variable for region date
  regions: ShippingRegion[];
  //creating object for storing customer data in customer object
  customer: Customer = new Customer();
  //definite registration form
  registerForm: FormGroup;
  //defineing loading and set to false
  loading = false;
  //define submit and set to fasel
  submitted = false;
  constructor(
    //define shiiping services for adreess
    private shippingService: ShippingService,
    //define formbulder
    private formBuilder: FormBuilder,
    //define customer services for customer data store
    private customerService: CustomerService,
    //define routing to move between pages
    private router: Router
  ) { }

  ngOnInit() {
    //calling ship regiion function
    this.GetShippingRegions();
    this.customer.RegionId = 1;
    //form validation
    this.registerForm = this.formBuilder.group({
      FirstName: ["", Validators.required],
      AddressOne: ["", null],
      AddressTwo: ["", null],
      Town: ["", null],
      Country: ["", null],
      RegionId: ["", null],
      ZipCode: ["", null],
      Mobile: ["", Validators.required],
      LastName: ["", Validators.required],
      Email: ["", Validators.required],
      Password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    //create form control
    return this.registerForm.controls;
  }

  GetShippingRegions() {
    //getting shipment regin
    this.shippingService.getShippingRegions().subscribe((a) => {
      this.regions = a as ShippingRegion[];
    });
  }

  onSubmit() {
    //setting submmited to true
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    //getting data from register form
    this.customer = this.registerForm.value;
    console.log(this.customer)
    //calling add customer function for custoemr services to insert customer record
    this.customerService.AddNewCustomer(this.customer).subscribe((a) => {
      if (a) {
        //navigate to custoemr login page
        this.router.navigate(["/customer/login"]);
      }
    });
  }
}
