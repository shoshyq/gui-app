import { Component, Input, OnInit  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit {
  @Input() bigger?: boolean = false;

  enable=true; 
  selectedData:any;
  constructor(private router: Router) { 
  }
ngOnInit()
{

}
 login(){
  this.enable=false;

  this.router.navigate(['/Home']);
  //sessionStorage.setItem('disableMb','true')
 // this.disableMb = (sessionStorage.getItem('disableMb') ==='true');

 }
 signup(){
  //sessionStorage.setItem('disable','false')
  this.enable=false;
      
  this.router.navigate(['/SignUp']);
        // sessionStorage.setItem('disableMb','true')
      // this.enable = (sessionStorage.getItem('disableMb') ==='true');
        //this.disable=(sessionStorage.getItem('disable') ==='true');
}
openLogIn(){
  
}
}




