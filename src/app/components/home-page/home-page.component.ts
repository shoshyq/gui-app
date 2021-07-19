import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  disableMb = false;
  selectedData: any;
  screenSize: number = 0;
  borderHeight: number = 0

  constructor(private router: Router) { 
    this.screenSize = window.innerWidth;
    this.calcBorderHeight();
  }

  ngOnInit(): void {
  }

  calcBorderHeight(): void {
    if (this.screenSize >= 1050) {
      this.borderHeight = 150;
    }
    else if (this.screenSize >= 600) {
      this.borderHeight = 100
    }
    else {
      this.borderHeight = 35;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenSize = event.target.innerWidth;
    this.calcBorderHeight();
    console.log(event.target.innerWidth);
  }

  login() {
    this.router.navigate(['/Home']);
    sessionStorage.setItem('disableMb', 'true')
    this.disableMb = (sessionStorage.getItem('disableMb') === 'true');

  }

  signup() {
    this.router.navigate(['/SignUp']);
    sessionStorage.setItem('disableMb', 'true')
    this.disableMb = (sessionStorage.getItem('disableMb') === 'true');
  }

}
