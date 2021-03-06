import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { MustMatch } from './mustmatch';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  signUpForm: FormGroup;
  submitted=false;
   form = new FormGroup({
    password: new FormControl('', Validators.required),
    passwordConfirm: new FormControl('', Validators.required),
  }, this.passwordMatchValidator);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  usernameFormControl = new FormControl('', [
    Validators.required
  ]);

  newUser:User = new User();
  subscribe:any;
  hide = true;
  constructor(private userService:UserService,private router: Router,private formBuilder: FormBuilder) {
    
  }
  

  ngOnInit()
  { 
    this.signUpForm = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(5)]],
            confirmPassword: ['', Validators.required]
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
  }
   passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('passwordConfirm').value
       ? null : {'mismatch': true};
 }
 getErrorMessage(value?: any): any {
  let formControl: FormControl = value as FormControl;
  if (formControl.hasError('required'))
    return 'You must enter a value';
  else if (formControl.hasError('minlength'))
    return 'Minimum 5 characters';
  else if (formControl.hasError('maxlength'))
    return 'The string is too long';
  else if (formControl.hasError('email'))
    return 'Please enter a valid email address';
}
  SignUp(frm:any){
    console.log(this.newUser.Code,this.newUser.Username,this.newUser.UserPassword);
    this.userService.SignUp(this.newUser).subscribe((code: number)=>{
     //???????? ???? ???????? ???????? ?????????? ?????????? ???????????? ???????? ???????????? ??????????
     this.newUser.Code=code; 
     if(code!=0)
      {
        console.log("user has been added successfully")
        sessionStorage.setItem('ucode',code.toString());

       this.router.navigate(['/Main',sessionStorage.getItem('ucode')]);
      }
     else 
     console.log("?????? ???? ?????? ???? ?????????? ???? ?????? ???????? ????????????")
     });
     
    }
    LogIn(){
      this.router.navigate(['/Home']);
      sessionStorage.setItem('disable','false');
}
get f() { return this.signUpForm.controls; }

onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signUpForm.invalid) {
        return;
    }

console.log("ok")
}
}