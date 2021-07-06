import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {

  newUser:User = new User();
    subscribe:any;
    passwordValidate:boolean;
    usernameValidate:boolean;

  constructor(private userService:UserService,private router: Router) { }

  ngOnInit(): void {
  }
  enter(frm:any){
    this.userService.Login(this.newUser.Username,this.newUser.UserPassword).subscribe(usercode=>
  {
    this.newUser.Code=usercode; 
    if(usercode!=0&&usercode!=-1)
   {
    sessionStorage.setItem('ucode',usercode.toString())
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
}
