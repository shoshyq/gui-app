import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Search } from '../models/search.model';
import { ParkSpot } from '../models/parkspot.model';

@Injectable({
  providedIn: 'root'
})

export class ParkingSpotService {


  url="https://localhost:44374/api/parkingSpots"
  constructor(private http:HttpClient) { }

      GetPSpot(pcode:number):Observable<ParkSpot>
      {
       return this.http.get<ParkSpot>(this.url+'/getPSpot/'+pcode)
      }
    
}