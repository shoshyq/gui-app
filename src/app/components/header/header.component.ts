import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Component, Input, OnInit } from '@angular/


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  disableMb = false;
  selectedData: any;
  @Input() bigger?: boolean = false;
  @Input() isButtonActive?: boolean = true;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  // ngOnInit()
  // {

  // }
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
}
