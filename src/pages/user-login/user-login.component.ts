import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  userLoginForm: FormGroup
  submitted: boolean = false;
  loading: boolean = false
  users: any = [];
  loggedIn: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.userLoginForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get formControls() {
    return this.userLoginForm.controls;
  }

  userLogin = () => { 
    this.submitted = true;
    this.loading = true;

    if (this.userLoginForm.invalid) {
      this.loading = false;
      return;
    }

    this.login()
  }

  login = () => {
    if (localStorage.getItem('users') != null) this.users = JSON.parse(localStorage.getItem('users') || '');
    console.log(this.users)

    let exist = this.users.filter(x => x.email == this.userLoginForm.controls.email.value)
    if (exist != '') {
      if (exist[0].password == this.userLoginForm.controls.password.value) {
        this.loggedIn = true;
      } else {
        this.toastrService.error('Wrong E-mail/Password');
      }
    } else {
      this.toastrService.error('Wrong E-mail/Password');
    }

  }

  logout = () => {
    this.loggedIn = false;
  }
}
