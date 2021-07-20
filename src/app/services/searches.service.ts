import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Search } from '../models/search.model';
import { ParkSpot } from '../models/parkspot.model';
import { City } from '../models/city.models';
import { WeekDay } from '../models/weekDay.models';
import { Result_Dictionary } from '../models/result_dictionary.model';
import { AddScheduleComponent } from '../components/add-schedule/add-schedule.component';
import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';
import { Search_Results } from '../models/search_results.model';
@Injectable({
  providedIn: 'root'
})

export class SearchesService {


  url="https://localhost:44374/api/searches"
  constructor(private http:HttpClient) { }
  AddImmidiateSearch(newSearch:Search):Observable<Array<Result_Dictionary>> {
      return this.http.post<Array<Result_Dictionary>>(`${this.url}/addImmidSearch`,newSearch);
      }
AddRegularSearch(newSearch:Search):Observable<number> {
        return this.http.post<number>(`${this.url}/addRegSearch`,newSearch);
      }
      GetSearch(scode:number):Observable<Search>
      {
       return this.http.get<Search>(this.url+'/getSearch/'+scode)
      }
      GetCities():Observable<City[]> {
          return this.http.get<City[]>(`${this.url}/getCities`);
          }
      AddCity(city:City):Observable<number> {
          return this.http.post<number>(`${this.url}/addCity`,city);
          }
  AddSchedule(newSchedule:WeekDay):Observable<number> {
            return this.http.post<number>(`${this.url}/addSchedule`,newSchedule);
    }
    GetSchedule(scode:number):Observable<WeekDay>
    {
     return this.http.get<WeekDay>(this.url+'/getSchedule/'+scode)
    }
    SelectResult(pspotCode:number,psearchCode:number):Observable<number>
    {
     return this.http.get<number>(`${this.url}/confirmImidSearchResult/${pspotCode}/${psearchCode}`)
    }
    ConfirmResult(srCode:number):Observable<number>
    {
     return this.http.get<number>(`${this.url}/confirmRegSearchResult/${srCode}`)
    }
    GetRegSearchesResults(ucode:number):Observable<Array<Search_Results>>
    {
     return this.http.get<Array<Search_Results>>(this.url+'/getRegSearchesResults/'+ucode)
    }
}