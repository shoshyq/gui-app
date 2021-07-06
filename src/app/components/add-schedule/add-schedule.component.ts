import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown/public_api';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Hours } from "../../models/hours.model";
import { WeekDay } from 'src/app/models/weekDay.models';
@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {
  newSchedule = new WeekDay();
  time1 = '08.00';
  form: FormGroup;
  dropdownList = [
    { item_id: 1, item_text: 'Sunday' },
    { item_id: 2, item_text: 'Monday'},
    { item_id: 3, item_text: 'Tuesday'},
    { item_id: 4, item_text: 'Wednesday' },
    { item_id: 5, item_text: 'Thursday' },
    { item_id: 6, item_text: 'Friday' }
  ];
  selectedDaysControl = new FormControl();
  selectedDays = [];
  sunday =false;
  monday=false;
  tuesday =false;
  wednesday =false;
  thursady =false;
  friday =false;
days= new FormControl();
  sunhours:Hours[];
  monhours:Hours[];
  tuehours:Hours[];
  wedhours:Hours[];
  thuhours:Hours[];
  frihours:Hours[];

  constructor() { }

  ngOnInit(): void {
 this.time1
 this.dropdownList = [
      { item_id: 1, item_text: 'Sunday' },
      { item_id: 2, item_text: 'Monday'},
      { item_id: 3, item_text: 'Tuesday'},
      { item_id: 4, item_text: 'Wednesday' },
      { item_id: 5, item_text: 'Thursday' },
      { item_id: 6, item_text: 'Friday' }
    ];
    this.form = new FormGroup({
      days: this.selectedDaysControl
        });
   
  }
  ampm(event:any) {
    var m = (Math.round(minutes/15) * 15) % 60;
    let time = event.target.value;
    if (time.value !== "") {
      var hours = time.split(":")[0];
      var minutes = time.split(":")[1];
      hours = hours % 12 || 12;
      hours = hours < 10 ? "0" + hours : hours;
  
      this.time1 = hours + ":" + ((Math.round(minutes/15) * 15) % 60);
      document.getElementById("time1").innerHTML = this.time1;
    }
  }

    onItemSelect(item: any) {
      let hrs = new Hours()
      hrs.StartHour= '00.00';
      hrs.EndHour = '00.00'; 

      let code = item.item_id;
      if( code = 1)
          this.newSchedule.SundayHours.push(hrs);
      if(code = 2)
          this.newSchedule.MondayHours.push(hrs);
      if(code = 3)
           this.newSchedule.TuedayHours.push(hrs);  
      if(code = 4)
           this.newSchedule.WednesdayHours.push(hrs);
      if(code = 5)
           this.newSchedule.ThursdayHours.push(hrs);
      if(code = 6)
           this.newSchedule.FridayHours.push(hrs);
     
    }
    onSelectAll(items: any) {
      console.log(items);
    }
    addhours(item:any)
    {
      let hrs = new Hours()
      hrs.StartHour= '00.00';
      hrs.EndHour = '00.00';
      item.hours.push(hrs); 
    }
    

}
function getday(code :number)
    {
      let name:string;
      if(code = 1)
          name = 'SundayHours';
      if(code = 1)
          name = 'MondayHours';
      if(code = 1)
          name = 'TuedayHours';
      if(code = 1)
          name = 'WednesdayHours';
      if(code = 1)
          name = 'ThursdayHours';
      if(code = 1)
          name = 'FridayHours';
return name;
    }

