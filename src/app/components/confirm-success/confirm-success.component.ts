import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParkSpot } from 'src/app/models/parkspot.model';
import { Search } from 'src/app/models/search.model';
import { User } from 'src/app/models/user.model';
import { WeekDay } from 'src/app/models/weekDay.models';
import { ParkingSpotService } from 'src/app/services/parkingSpot.service';
import { SearchesService } from 'src/app/services/searches.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-confirm-success',
  templateUrl: './confirm-success.component.html',
  styleUrls: ['./confirm-success.component.css']
})
export class ConfirmSuccessComponent implements OnInit {
  passedList: any = [];
  searchCode: number;
  pspotCode:number;
  srCode :number;
  search: Search = new Search();
  pspot: ParkSpot = new ParkSpot();
  schedule: WeekDay = new WeekDay();
  spotOwner: User = new User();
  phone: boolean = false;
  constructor(private router: Router,private spotService:ParkingSpotService,private userService: UserService, private searchesService: SearchesService,) { }

  ngOnInit(): void {
    
    this.passedList = history.state.data;
    console.log(this.passedList);
    if (this.passedList != undefined) {
      this.srCode = this.passedList[0].code;
      this.pspotCode = this.passedList[0].pspotCode;
      this.searchCode = this.passedList[0].searchCode;


      this.searchesService.GetSearch(this.searchCode).subscribe(search => {
        this.search = search;
          this.spotService.GetPSpot(this.pspotCode).subscribe(pspot=>
          {   this.pspot = pspot;
            console.log(this.pspot);
          
      this.userService.GetUser(this.pspot.UserCode.toString()).subscribe(user => {
        this.spotOwner = user;
        console.log(this.spotOwner);
        if ((this.spotOwner.UserPhoneNumber != "") && (this.spotOwner.UserPhoneNumber != null))
          this.phone = true;
      });
      });
    });
    }
  }
  main() {
    this.router.navigate(['/Main', sessionStorage.getItem('ucode')]);

  }
}
