import { Component, OnInit } from '@angular/core';
import { ParkSpot } from 'src/app/models/parkspot.model';
import { Search } from 'src/app/models/search.model';
import { Search_Results } from 'src/app/models/search_results.model';
import { WeekDay } from 'src/app/models/weekDay.models';
import { ParkingSpotService } from 'src/app/services/parkingSpot.service';
import { SearchesService } from 'src/app/services/searches.service';

@Component({
  selector: 'app-reg-search-details',
  templateUrl: './reg-search-details.component.html',
  styleUrls: ['./reg-search-details.component.css']
})
export class RegSearchDetailsComponent implements OnInit {

  resultslist :Array<Search_Results>;
  searches:Array<Search> =[];
  pspots:Array<ParkSpot>=[];
  schedulelst: Array<WeekDay>=[];
  doesnthave=false;
  schedule:WeekDay= new  WeekDay();
  constructor(private spotService:ParkingSpotService, private searchesService:SearchesService) { }

  ngOnInit(): void {
    this.doesnthave = true;
    this.searchesService.GetRegSearchesResults(+sessionStorage.getItem('ucode')).subscribe(lst =>{
     
      this.resultslist = lst;
      console.log(this.resultslist);
      this.checkifIs();
      
      if((this.resultslist!=[])&&(this.resultslist!=null))
          this.doesnthave = true;
      for(let i=0; i<this.resultslist.length; i++){

        this.searchesService.GetSearch(this.resultslist[i].SearchCode).subscribe(search=>
          {   this.searches.push(search);
          });
          this.spotService.GetPSpot(this.resultslist[i].ResultPSCode).subscribe(pspot=>
            {   this.pspots.push(pspot);
              this.searchesService.GetSchedule(this.pspots[i].DaysSchedule).subscribe(schedule=>
              {  
                  this.schedulelst.push(schedule);
                  this.schedulelst[i].SundayHours[0].StartHour
              });

            });
            
      }       
    });
    
  }
  checkifIs()
  {
    if((this.resultslist==null)||(this.resultslist==[])||(this.resultslist==undefined))
      {
        this.doesnthave=true;
        return false;
      }
    else
    return true;

  }
  selectResult(i:number)
  {
    console.log(i);
    
  }
}
