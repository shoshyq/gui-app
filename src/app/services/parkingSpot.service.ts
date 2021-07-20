import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Search } from '../models/search.model';
import { ParkSpot } from '../models/parkspot.model';
import { WeekDay } from 'src/app/models/weekDay.models';

@Injectable({
  providedIn: 'root'
})

export class ParkingSpotService {


  url="https://localhost:44374/api/parkingSpots"
  constructor(private http:HttpClient) { }

      GetPSpot(scode:number):Observable<ParkSpot>
      {
       return this.http.get<ParkSpot>(`${this.url}/getPSpot/${scode}`)

      }
      GetPSpotByUCode(ucode:number):Observable<ParkSpot>
      {
       return this.http.get<ParkSpot>(`${this.url}/getPSpotByUser/${ucode}`)

      }
      GetSchedule(scode:number):Observable<WeekDay>
      {
        return this.http.get<WeekDay>(`${this.url}/getSchedule/${scode}`)
      }
      AddSpot(spot:ParkSpot):Observable<number> {
          return this.http.post<number>(`${this.url}/addParkSpot`,spot);
          }
    
}