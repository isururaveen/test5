import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CustomerService } from "src/app/services/Customer/customer.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  //Form Group in html page
  loginForm: FormGroup;
  //setting lodating false
  loading = false;

  //set submiited false
  submitted = false;
  //defined string
  returnUrl: string;
  constructor(
    //define form bulder
    private formBuilder: FormBuilder,
    //defiing route
    private router: Router,
    //definer customer servieces
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    //form Validtion
    this.loginForm = this.formBuilder.group({
      //user name valdiation field
      username: ["", Validators.required],
      //password valiation field
      password: ["", Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    ///callign custoemr sevice login function to login usign name and password
    this.customerService
      .Login(this.f.username.value, this.f.password.value)
      .subscribe(
        (data) => {
          //converting data to json string to store in locaal stoarge items
          localStorage.setItem("user", JSON.stringify(data[0]));
          //naviagte to products page
          this.router.navigate(["/products"]);
        },
        (error) => {
          this.loading = false;
        }
      );
  }
}
