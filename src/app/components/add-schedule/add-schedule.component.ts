import { Component, Input, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown/public_api';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Hours } from "../../models/hours.model";
import { WeekDay } from 'src/app/models/weekDay.models';
import { SearchesService } from 'src/app/services/searches.service';
import { Router } from '@angular/router';
import { FocusTrap } from '@angular/cdk/a11y';

let emailRegex = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {
  newSchedule = new WeekDay();
   public formGroup: FormGroup;

  newDays = [
    { i: 1, hours: [] },
    { i: 2, hours:  []},
    { i: 3, hours: []},
    { i: 4, hours:  [] },
    { i: 5, hours:  []},
    { i: 6, hours:  [] }
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
  sunhours:Hours[];
  monhours:Hours[];
  tuehours:Hours[];
  wedhours:Hours[];
  thuhours:Hours[];
  frihours:Hours[];
  constructor(private searchesService:SearchesService,private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    for (let i = 0; i < this.newDays.length; i++) {
     // this.newDays[i].hours.forEach(e => {
    //formControls[e] = new FormControl(e);
  //  });
    }
 
 this.dropdownList = [
      { item_id: 1, item_text: 'Sunday' },
      { item_id: 2, item_text: 'Monday'},
      { item_id: 3, item_text: 'Tuesday'},
      { item_id: 4, item_text: 'Wednesday' },
      { item_id: 5, item_text: 'Thursday' },
      { item_id: 6, item_text: 'Friday' }
    ];
    const formTGroups = {};
    const formTTGroup = {};
    this.formGroup = this.formBuilder.group({
      day:new FormControl(''),
      daytime: this.formBuilder.array([
        this.formBuilder.group({
          dayi: new FormControl(''),
            sh1: new FormControl(''),
            eh1: new FormControl(''),
            sh2: new FormControl(''),
            eh2: new FormControl('')
        })
      ])
    })
  //  this.formGroup = this.formBuilder.group({

  //    day: this.formBuilder.control(''),
    //  hours: this.formBuilder.array([
      //  this.formBuilder.group({
        //  sh: new FormControl(''),
          //eh: new FormControl('')
 //       }),
   //     this.formBuilder.group({
     //     sh2: new FormControl(''),
       //   eh2: new FormControl(''),
  //      })
 //     ])
  //  })

  
 //   this.newDays.forEach(e => {
   //   formTGroups[e.i] = this.formBuilder.group({
    //    day : [''],
    //    tformG: this.formBuilder.group({
    //      starth: [''],
    //      endh: ['']
    //    })
   //   })
    ///   new FormControl(e);
  //  });
   // this.formGroup = this.formBuilder.group(formTGroups);
    console.log("formgroup"+this.formGroup);
    this.form = this.formBuilder.group({ 
      child: this.formBuilder.group({
        id: ['', [Validators.required]],
        name: ['']
      })
    });
  //  this.form = new FormGroup({
    //  days: this.selectedDaysControl
      //  });
   
  }
  addSchedule(){

    for (let index = 0; index < this.newDays.length; index++) {
      if(index = 0)
      this.newSchedule.SundayHours = this.newDays[index].hours;
       if(index = 1)
      this.newSchedule.MondayHours = this.newDays[index].hours; 
        if(index = 2)
         this.newSchedule.TuedayHours = this.newDays[index].hours;
       if(index = 3)
      this.newSchedule.WednesdayHours = this.newDays[index].hours;
       if(index = 4)
       this.newSchedule.ThursdayHours = this.newDays[index].hours; 
       if(index = 5)
        this.newSchedule.FridayHours = this.newDays[index].hours;
    }
    console.log(this.newSchedule);
    this.searchesService.AddSchedule(this.newSchedule).subscribe((code: number)=>{
      //לקבל את הקוד חברה שנכנס עכשיו ולשלוח אותו להוספת בחירה
      this.newSchedule.Code=code; 
      console.log(code);
      if(code!=0)
       {
         console.log(this.newSchedule.Code)
         sessionStorage.setItem('scheduleCode',code.toString());
        }
      else 
         console.log("something is wrong");
      });
  }
  gethours(h:any) {
    let time = h;
   
    if (time.value !== "") {
      var hours = time.split(":")[0];
      var minutes = time.split(":")[1];
    //  hours = hours % 12 || 12;
    if (isNaN(+minutes))
    {
      return '0';
    }
    if(minutes > 52)
      {
       hours =  hours === '23' ? '00' : ++hours
      }
      minutes = ((Math.round(minutes/15) * 15) % 60)
      minutes = minutes===0? '00' : minutes;
      return hours + "." + minutes;
    }
    else
    {
      return '0';
    }
  }
  onSubmit() {
    console.log(this.formGroup.value);
    let daysArray = this.formGroup['controls'].daytime as FormArray;
   // let arraylen = daysArray.length;

   // let newDaysgroup: FormGroup =  this.formBuilder.group({
   //   day: new FormControl(''),
   //     sh1: new FormControl(''),
       // eh1: new FormControl(''),
     //   sh2: new FormControl(''),
   //     eh2: new FormControl('')
 //   })

  //  daysArray.insert(arraylen, newDaysgroup);
  }

  onNgModelChange(event){
    let daysArray = this.formGroup['controls'].daytime as FormArray;
 let arraylen = daysArray.length;

   let newDaysgroup: FormGroup =  this.formBuilder.group({
      dayi: event[0],
       sh1: new FormControl(''),
       eh1: new FormControl(''),
       sh2: new FormControl(''),
      eh2: new FormControl('')
   })
  // daysArray.insert(arraylen, newDaysgroup);
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
        //this.newDays = this.newDays.filter(({ i }) => i == item);        
      }    
    }
     this.selectedDays = event;
   // console.log(this.newDays);
  }
 
    addhours(dayi:number,st:any,en:any)
    {     
      console.log(st);
      let hrs = new Hours()
      let sth = this.gethours(st);
      let enh = this.gethours(en);
      if((sth!='0')&&(enh!='0'))
      {
            hrs.StartHour= sth;
      hrs.EndHour =  enh;
      var object ={i:dayi-1, hours: [hrs]}
      this.newDays[dayi-1].hours.push(object) ;
      }
  
      console.log(this.newDays);
    }
    

  

  }

function getday(code :number)
    {
      let name:string;
     
return name;
    }

