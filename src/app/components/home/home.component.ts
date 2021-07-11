import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  newUser:User = new User();
  hide = true;

  subscribe:any;
  passwordValidate:boolean;
  usernameValidate:boolean;
 disable = true;
constructor(private userService:UserService,private router: Router) { }

ngOnInit(): void {
}
enter(frm:any){
  this.userService.Login(this.newUser.Username,this.newUser.UserPassword).subscribe(usercode=>
{
  this.newUser.Code=usercode; 
  if(usercode!=0&&usercode!=-1)
 {
  sessionStorage.setItem('ucode',usercode.toString());
  sessionStorage.setItem('disable','false');
  this.disable=(sessionStorage.getItem('disable') ==='true');

  console.log(usercode);
   this.router.navigate(['/Main',sessionStorage.getItem('ucode')]);   
 }
 else
 {
   if(usercode==-1)
   {
     this.passwordValidate= true;
    console.log("wrong password");
   }
   else
   {
    this.usernameValidate= true;
    this.passwordValidate= false;
     console.log("there is no user with such username");
   }
 }

})
}
getErrorMessage(value?: any): any {
  let formControl: FormControl = value as FormControl;
  if (formControl.hasError('required'))
    return 'You must enter a value';
  else if (formControl.hasError('minlength'))
    return 'Minimum 5 characters';
  else if (formControl.hasError('maxlength'))
    return 'The string is too long';
}
LogIn(){
        sessionStorage.setItem('disable','false')

        this.router.navigate(['/LogIn']);
  
        this.disable=(sessionStorage.getItem('disable') ==='true');
  }
SignUp(){
  sessionStorage.setItem('disable','false')
        this.router.navigate(['/SignUp']);
        this.disable=(sessionStorage.getItem('disable') ==='true');
}
Exc(){
            this.router.navigate(['/Exc']);
    } 
     AddPaymentDetails(){
      this.router.navigate(['/PaymentDetails']);
      }
      SearchResults(){
        this.router.navigate(['/SearchResults']);
        }
        AddImmidSearch(){
          this.router.navigate(['/ImmidSearch']);
          }
}
