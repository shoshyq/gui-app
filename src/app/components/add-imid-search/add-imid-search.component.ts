import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Search } from 'src/app/models/search.model';
import { SearchesService } from 'src/app/services/searches.service';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ParkSpot } from 'src/app/models/parkspot.model';
@Component({
  selector: 'app-add-imid-search',
  templateUrl: './add-imid-search.component.html',
  styleUrls: ['./add-imid-search.component.css']
})
export class AddImidSearchComponent implements OnInit {

 
  parkSpotResultList:ParkSpot[]
  codeFormControl = new FormControl('', [
    Validators.required,
    ]);

  newSearch:Search = new Search();
  subscribe:any;

  constructor(private searchesService:SearchesService,private router: Router) {
    
  }
  
  ngOnInit()
  { 
    //sessionStorage.setItem('enter','0');
  }
  AddImmidiateSearch(frm:any){
  
    this.searchesService.AddImmidiateSearch(this.newSearch).subscribe(dic=>
      {
        let i=0;
        dic.forEach((value: string, key: ParkSpot) => {
          this.parkSpotResultList[i] = key;
          i++;
        });
    
       
     if(dic!=null)
      {
        console.log("search has been added successfully")
        console.log(this.newSearch.Code);
      }
     else 
     console.log("something's wrong")
     });
    
  }
}
