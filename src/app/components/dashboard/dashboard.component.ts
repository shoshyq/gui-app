import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

newUser:User=new User();
  disable=false;
    constructor(private userService:UserService,private router: Router) { }

  ngOnInit(): void {
  }
  imidSearch(){
      this.router.navigate(['ImmidSearch/',sessionStorage.getItem('ucode')]); 

  }
  addRegSearch(){
    this.router.navigate(['AddRegularSearch/',sessionStorage.getItem('ucode')]); 

}
feedbacks(){
  //this.router.navigate(['FeedbackDetails/']); 
  this.disable=true

}
updateUserDetails(){
  this.router.navigate(['UpdateUserDetails/']); 

}
updatePaymentDetails(){
  this.router.navigate(['UpdatePaymentDetails/']); 

}
addPaymentDetails(){
  this.router.navigate(['AddPaymentDetails/']); 

}
updateRegSearch(){
  this.router.navigate(['UpdateRegularSearch/']); 
  
}
getuser(){
  this.userService.GetUser(sessionStorage.getItem('ucode')).subscribe(user=>
    {
     
      console.log(user)

      this.newUser=user; 
      console.log(this.newUser.Code)
      
   
     })
    }

}
