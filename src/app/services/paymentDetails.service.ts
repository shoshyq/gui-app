import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpClientModule} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentDetails } from '../models/paymentDetails.models';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailsService {

  url="https://localhost:44374/api/paymentDetails"
  constructor(private http:HttpClient) { }

  
  AddPaymentDetails(newPAccount:PaymentDetails):Observable<number>
  {
  let headers=new Headers({'Content-type':'application/json; charset=utf-8'});
  return this.http.post<number>(`${this.url}/addPaymentAccount`,newPAccount);
  }


}