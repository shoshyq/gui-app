import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Search } from '../models/search.model';
import { ParkSpot } from '../models/parkspot.model';
import { City } from '../models/city.models';
import { WeekDay } from '../models/weekDay.models';
import { AddScheduleComponent } from '../components/add-schedule/add-schedule.component';
@Injectable({
  providedIn: 'root'
})
export class SearchesService {
 

  url="https://localhost:44374/api/searches"
  constructor(private http:HttpClient) { }
  AddImmidiateSearch(newSearch:Search):Observable<Map<ParkSpot,string>> {
      return this.http.post<Map<ParkSpot,string>>(`${this.url}/addImmidSearch`,newSearch);
      }
AddRegularSearch(newSearch:Search):Observable<number> {
        return this.http.post<number>(`${this.url}/addRegSearch`,newSearch);
      }
      GetCities():Observable<City[]> {
          return this.http.get<City[]>(`${this.url}/getCities`);
          }
  AddSchedule(newSchedule:WeekDay):Observable<number> {
            return this.http.post<number>(`${this.url}/addSchedule`,newSchedule);
    }
}