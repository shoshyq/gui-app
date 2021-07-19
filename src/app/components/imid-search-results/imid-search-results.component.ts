import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Hours } from 'src/app/models/hours.model';
import { ParkSpot } from 'src/app/models/parkspot.model';
import { Search } from 'src/app/models/search.model';
import { User } from 'src/app/models/user.model';
import { WeekDay } from 'src/app/models/weekDay.models';
import { SearchesService } from 'src/app/services/searches.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-imid-search-results',
  templateUrl: './imid-search-results.component.html',
  styleUrls: ['./imid-search-results.component.css']
})
export class ImidSearchResultsComponent implements OnInit {
  today: number;
  passedList: any = [];
  searchCode: number;
  hours: Hours = new Hours();
  search: Search = new Search();
  pspot: ParkSpot = new ParkSpot();
  schedule: WeekDay = new WeekDay();
  spotOwner: User = new User();
  phone: boolean = false;
  constructor(private userService: UserService, private searchesService: SearchesService, private router: Router) { }

  ngOnInit(): void {
    this.today = new Date().getDay();



    this.passedList = history.state.data;
    console.log(this.passedList);
    if (this.passedList != undefined) {
      this.searchCode = this.passedList[0].searchCode;
      this.pspot = this.passedList[0].spot;
    }

    this.searchesService.GetSchedule(this.pspot.DaysSchedule).subscribe(schedule => {
      this.schedule = schedule;
      if (this.today == 0) {
        this.hours = this.schedule[0].SundayHours[0];
      }
      if (this.today == 1) {
        this.hours = this.schedule[0].MondayHours[0];
      }
      if (this.today == 2) {
        this.hours = this.schedule.TuesdayHours[0];
      }
      if (this.today == 3) {
        this.hours = this.schedule.WednesdayHours[0];
      }
      if (this.today == 4) {
        this.hours = this.schedule[0].ThursdayHours[0];
      }
      if (this.today == 5) {
        this.hours = this.schedule[0].FridayHours[0];
      }
      console.log(this.schedule);
    });
    this.searchesService.GetSearch(this.searchCode).subscribe(search => {
      this.search = search;
      console.log(this.search);
    });
    this.userService.GetUser(this.pspot.UserCode.toString()).subscribe(user => {
      this.spotOwner = user;
      console.log(this.spotOwner);
      if ((this.spotOwner.UserPhoneNumber != "") && (this.spotOwner.UserPhoneNumber != null))
        this.phone = true;
    });

  }
  main() {
    this.router.navigate(['/Main', sessionStorage.getItem('ucode')]);

  }
}
