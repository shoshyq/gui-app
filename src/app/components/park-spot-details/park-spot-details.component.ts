import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParkSpot } from 'src/app/models/parkspot.model';
import { WeekDay } from 'src/app/models/weekDay.models';
import { ParkingSpotService } from 'src/app/services/parkingSpot.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-park-spot-details',
  templateUrl: './park-spot-details.component.html',
  styleUrls: ['./park-spot-details.component.css']
})
export class ParkSpotDetailsComponent implements OnInit {
 
  pspot:ParkSpot = new ParkSpot();
  schedule: WeekDay = new WeekDay();
  constructor(private router: Router,private spotService:ParkingSpotService) { }

  ngOnInit(): void {
    this.spotService.GetPSpotByUCode(+sessionStorage.getItem('ucode')).subscribe(pspot=>
      {   this.pspot = pspot;
        sessionStorage.setItem('pspotCode',this.pspot.Code.toString());
        console.log(this.pspot.PricePerHour);
        this.spotService.GetSchedule(this.pspot.DaysSchedule).subscribe(schedule=>
          {
            this.schedule = schedule;
          });
      });

  }
  update()
  {
    this.router.navigate(['/UpdateParkSpot']);

  }
add()
{
  
  this.router.navigate(['/AddParkSpot']);

}
}
