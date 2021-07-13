import { Component, OnInit } from '@angular/core';
import { Result_Dictionary } from 'src/app/models/result_dictionary.model';
import { User } from 'src/app/models/user.model';
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
userslist : any = [];
schedlst :any=[];
actulst : any =[];
 resultList:Array<Result_Dictionary>;
  constructor(private userService:UserService,private searchesService:SearchesService) { }
  //selectedHero?: Hero;
  ngOnInit(): void {
   
    this.resultList = history.state.data;
    console.log(this.resultList);
 this.userService.GetAllUsers().subscribe(list=>
      {       
            this.userslist=list;  
            console.log(list);  
            console.log(this.userslist);    
            for(let i=0; i<this.userslist.length; i++){
              for(let j=0; j<this.resultList.length; j++){
                if(this.resultList[j].PSpot.UserCode == this.userslist[i].Code)
                {
                  this.actulst.push(this.userslist[i]);
                  this.searchesService.GetSchedule(this.resultList[j].PSpot.DaysSchedule).subscribe(schedule=>
                    {  
                        this.schedlst.push(schedule);
                    });
                }
              }
            }
            console.log(this.schedlst);
      });
   
      
    
     // this.userslist.forEach( (element) => {
     //   element = element.product_desc.substring(0,10);
   // });
    
    console.log(this.actulst);
    
  }
 // onSelect(hero: Hero): void {
  //  this.selectedHero = hero;
 // }
}
