import { Component, OnInit } from '@angular/core';
import { Result_Dictionary } from 'src/app/models/result_dictionary.model';
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
 // heroes: Hero[] = [
 //   { id: 11, name: 'Dr Nice' },
 // ];
 resultList:Array<Result_Dictionary>;
  constructor() { }
  //selectedHero?: Hero;
  ngOnInit(): void {
    this.resultList = history.state.data;
    console.log(this.resultList);
  }
 // onSelect(hero: Hero): void {
  //  this.selectedHero = hero;
 // }
}
