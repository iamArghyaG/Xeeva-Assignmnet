import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-reg',
  templateUrl: './user-reg.component.html',
  styleUrls: ['./user-reg.component.css']
})
export class UserRegComponent implements OnInit {

  userRegForm: FormGroup
  users: any = [];
  loading: boolean = false;
  submitted: boolean = false;
  passMatch: boolean = false;
  dateTime: any;

  constructor(
    private _formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.userRegForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      dob: ['', Validators.required],
      address: [''],
      city: [''],
      state: [''],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  get formControls() {
    return this.userRegForm.controls;
  }

  checkPasswords = () => {
    const password = this.userRegForm.controls['password'].value;
    const confirmPassword = this.userRegForm.controls['confirmPassword'].value;

    return password === confirmPassword ? true : false;
  }

  prepareAndSaveData = () => {
    if (localStorage.getItem('users') != null) this.users = JSON.parse(localStorage.getItem('users') || '');
    // console.log(this.users.length)

    let exist = this.users.filter(x => x.email == this.userRegForm.controls.email.value)
    // console.log(exist)
    // console.log(this.userRegForm.value)
    if (exist == '') {
      this.users.push(this.userRegForm.value);
      this.submitted = false;
      localStorage.setItem('users', JSON.stringify(this.users))
      this.toastrService.success('User Created Successfully!');
      this.ngOnInit()
    } else {
      this.toastrService.error('E-mail Already Exists');
    }
      
    this.loading = false;
    
  }

  userRegSubmit = () => {
    this.submitted = true
    this.loading = true;
    this.passMatch = this.checkPasswords();

    if (this.userRegForm.invalid || !this.passMatch) {
      this.loading = false;
      this.toastrService.error('Please correct the errors');
      return;
    }

    this.prepareAndSaveData()
  }

}
