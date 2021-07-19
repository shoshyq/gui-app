import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Result_Dictionary } from 'src/app/models/result_dictionary.model';
import { User } from 'src/app/models/user.model';
import { WeekDay } from 'src/app/models/weekDay.models';
import { SearchesService } from 'src/app/services/searches.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  // heroes: Hero[] = [
  //   { id: 11, name: 'Dr Nice' },
  // ];
  today: number;
  searchCode: number;
  datalist: Array<Result_Dictionary> = null;
  userslist: any = [];
  schedlst: any = [];
  schdl: WeekDay = new WeekDay();
  actulst: any = [];
  passlist: any = [];
  resultList: Array<Result_Dictionary>;
  constructor(private userService: UserService, private searchesService: SearchesService, private router: Router) { }
  //selectedHero?: Hero;
  ngOnInit(): void {
    this.today = new Date().getDay();
    this.datalist = history.state.data;
    if (this.datalist != undefined) {
      this.searchCode = this.datalist[this.datalist.length - 1].PSpot.Code;
      this.datalist.pop();
      this.resultList = this.datalist;
      console.log(this.resultList);
      this.userService.GetAllUsers().subscribe(list => {
        this.userslist = list;
        console.log(list);
        console.log(this.userslist);
        for (let j = 0; j < this.resultList.length; j++) {
          for (let i = 0; i < this.userslist.length; i++) {
            if (this.resultList[j].PSpot.UserCode == this.userslist[i].Code) {
              this.actulst.push(this.userslist[i]);
              this.searchesService.GetSchedule(this.resultList[j].PSpot.DaysSchedule).subscribe(schedule => {
                this.schdl = schedule;
                this.schedlst.push(this.schdl);
                console.log(this.schedlst[i].TuesdayHours );
                

              });
            }
          }
        }
        console.log(this.schedlst);
      });

    }

    // this.userslist.forEach( (element) => {
    //   element = element.product_desc.substring(0,10);
    // });

    console.log(this.actulst);

  }
  ifDay(i: number, Day: string) {
    if (Day == 'Sunday') {
      if (this.schedlst[i].SundayHours != null)
        return true;
      else
        return false;
    }
    if (Day == 'Monday') {
      if (this.schedlst[i].MondayHours != null)
        return true;
      else
        return false;
    }
    if (Day == 'Tuesday') {
      if (this.schedlst[i].TuesdayHours != null)
        return true;
      else
        return false;
    }
    if (Day == 'Wednesday') {
      if (this.schedlst[i].WednesdayHours != null)
        return true;
      else
        return false;
    }
    if (Day == 'Thursday') {
      if (this.schedlst[i].ThursdayHours != null)
        return true;
      else
        return false;
    }
    if (Day == 'Friday') {
      if (this.schedlst[i].FridayHours != null)
        return true;
      else
        return false;
    }
    else
      return false;

  }
  selectResult(i: number) {
    this.searchesService.SelectResult(this.resultList[i].PSpot.Code, this.searchCode).subscribe(result => {
      console.log(result);
      if (result == 1) {
        console.log("cheeeers!");
        this.passlist = [{ spot: this.resultList[i].PSpot, searchCode: this.searchCode }];
        this.router.navigate(['/ConfirmIResultMsg'], { state: { data: this.passlist } });

      }
      else {
        console.log("error in sending email");
      }

      //this.schedlst.push(this.schdl);
    });
  }
  // onSelect(hero: Hero): void {
  //  this.selectedHero = hero;
  // }
}
