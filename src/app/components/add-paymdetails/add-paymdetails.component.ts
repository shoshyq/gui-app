import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentDetails } from 'src/app/models/paymentDetails.models';
import { PaymentDetailsService } from 'src/app/services/paymentDetails.service';
import { FormGroup } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
@Component({
  selector: 'app-add-paymdetails',
  templateUrl: './add-paymdetails.component.html',
  styleUrls: ['./add-paymdetails.component.css']
})
export class AddPaymdetailsComponent implements OnInit {
  name: string = '';
  
  newpd:PaymentDetails;
  subscribe:any;
  сreditCardNumberFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  expiryDateYearFormControl = new FormControl('', [
    Validators.required
  ]);
  expiryDateMonthFormControl = new FormControl('', [
    Validators.required
  ]);
  securityCodeFormControl = new FormControl('', [
    Validators.required
  ]);
  postalCodeFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private paymentService:PaymentDetailsService,private router: Router) { }

  ngOnInit(): void {
  }
  AddPaymentDetails(usercode:number,frm:any){
    console.log(this.newpd.Code,this.newpd.CreditCardNumber,this.newpd.PaymentAmount);
    this.paymentService.AddPaymentDetails(this.newpd).subscribe((code: number)=>{
     //לקבל את הקוד חברה שנכנס עכשיו ולשלוח אותו להוספת בחירה
     this.newpd.Code=code; 
     if(code!=0)
      {
        console.log("payment details have been added successfully")
        sessionStorage.setItem('code',code.toString())
      // this.router.navigate(['/Main']);
      }
     else 
     console.log("no");
     });
     
    }

}
