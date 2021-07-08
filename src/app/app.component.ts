import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gui-app';
  disableMb=false; 
  selectedData:any;
  constructor(private router: Router) { 
  }

 login(){
  this.router.navigate(['/Home']);
  sessionStorage.setItem('disableMb','true')
  this.disableMb = (sessionStorage.getItem('disableMb') ==='true');

 }
 signup(){
  //sessionStorage.setItem('disable','false')
        this.router.navigate(['/SignUp']);
        sessionStorage.setItem('disableMb','true')
        this.disableMb = (sessionStorage.getItem('disableMb') ==='true');
       // this.disable=(sessionStorage.getItem('disable') ==='true');
}
openLogIn(){
  
}
}
