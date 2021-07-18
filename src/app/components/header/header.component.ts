import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { LogInMessageComponent } from '../log-in-message/log-in-message.component';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() bigger?: boolean = false;

  enable=true; 
  selectedData:any;
  constructor(private router: Router) { }

  ngOnInit(): void {
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

  disableMb = false;
  selectedData: any;
  @Input() bigger?: boolean = false;
  @Input() isButtonActive?: boolean = true;
  constructor(private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  login() {
    this.router.navigate(['/Home']);
    sessionStorage.setItem('disableMb', 'true')
    this.disableMb = (sessionStorage.getItem('disableMb') === 'true');

  }
  signup() {
    //sessionStorage.setItem('disable','false')
    this.router.navigate(['/SignUp']);
    sessionStorage.setItem('disableMb', 'true')
    this.disableMb = (sessionStorage.getItem('disableMb') === 'true');
    // this.disable=(sessionStorage.getItem('disable') ==='true');
  }
  openLogIn() {

  }


  openMainPage() {
    let ucode = sessionStorage.getItem('ucode');
    if (ucode != null && ucode != undefined) {
      this.router.navigate(['/Main', sessionStorage.getItem('ucode')]);
    }
    else {
      this.openSnackBar();
    }
  }
  openSnackBar() {
    this._snackBar.openFromComponent(LogInMessageComponent, {
      duration: 2000,
    });
  }
}
