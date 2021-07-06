import { Component, Input, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown/public_api';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Hours } from "../../models/hours.model";
import { WeekDay } from 'src/app/models/weekDay.models';
@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {
  newSchedule = new WeekDay();
  @Input() colors: string[] = ['blue'];
public formGroup: FormGroup;
  newDays = [
    { i: 1, hours: [{sh: '00.00', eh: '00.00'},{sh: '00.00', eh: '00.00'}] },
    { i: 2, hours:  [ {sh: '00.00', eh: '00.00'},{sh: '00.00', eh: '00.00'}]},
    { i: 3, hours: [{sh: '00.00', eh: '00.00'},{sh: '00.00', eh: '00.00'}]},
    { i: 4, hours:  [{sh: '00.00', eh: '00.00'},{sh: '00.00', eh: '00.00'}] },
    { i: 5, hours:  [{sh: '00.00', eh: '00.00'},{sh: '00.00', eh: '00.00'}]},
    { i: 6, hours:  [{sh: '00.00', eh: '00.00'},{sh: '00.00', eh: '00.00'}] }
  ]
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
selectedOptions= [];
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const formControls = {};
    for (let i = 0; i < this.newDays.length; i++) {
     // this.newDays[i].hours.forEach(e => {
    //formControls[e] = new FormControl(e);
  //  });
    }
 
  this.formGroup = this.formBuilder.group(formControls);
 this.time1
 this.dropdownList = [
      { item_id: 1, item_text: 'Sunday' },
      { item_id: 2, item_text: 'Monday'},
      { item_id: 3, item_text: 'Tuesday'},
      { item_id: 4, item_text: 'Wednesday' },
      { item_id: 5, item_text: 'Thursday' },
      { item_id: 6, item_text: 'Friday' }
    ];
  //  this.form = new FormGroup({
    //  days: this.selectedDaysControl
      //  });
   
  }
  ampm(event:any) {
    var m = (Math.round(minutes/15) * 15) % 60;
    let time = event.target.value;
    if (time.value !== "") {
      var hours = time.split(":")[0];
      var minutes = time.split(":")[1];
      hours = hours % 12 || 12;
      hours = hours < 10 ? "0" + hours : hours;
      minutes = ((Math.round(minutes/15) * 15) % 60)
      this.time1 = hours + ":" + minutes;
    }
  }

  onNgModelChange(event){
    console.log("event:" + event)
    let newlen = event.length
   console.log(this.newDays)
    if(newlen> this.selectedDays.length)
    {
      let hrs = new Hours()
    hrs.StartHour= '00.00';
    hrs.EndHour = '00.00'; 
    var object ={i:event[0], hours: [hrs]}
    //this.newDays.push(object)
    }
    else{
      for (let item of event) {
        this.newDays = this.newDays.filter(({ i }) => i == item);        
      }    
    }
     this.selectedDays = event;
    console.log(this.newDays);
  }
 
    addhours(dayi:number)
    { 
      
      console.log(this.newDays)
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

