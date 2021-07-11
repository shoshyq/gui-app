import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserService } from './services/user.service';
import { HttpClient } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {User} from './models/user.model';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';

//import { SearchesComponent } from './components/searches/searches.component';
/// <reference types="google.maps" />
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ExcComponent } from './components/exc/exc.component';
import { AddPaymdetailsComponent } from './components/add-paymdetails/add-paymdetails.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { AddImidSearchComponent } from './components/add-imid-search/add-imid-search.component';
import { MainComponent } from './components/main/main.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UpdatePaymentDetailsComponent } from './components/update-payment-details/update-payment-details.component';
import { AddPaymentDetailsComponent } from './components/add-payment-details/add-payment-details.component';
import { UpdateUserDetailsComponent } from './components/update-user-details/update-user-details.component';
import { FeedbackDetailsComponent } from './components/feedback-details/feedback-details.component';
import { AddRegularSearchComponent } from './components/add-regular-search/add-regular-search.component';
import { UpdateRegularSearchComponent } from './components/update-regular-search/update-regular-search.component';
import { PaypalComponent } from './components/paypal/paypal.component';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'
import { GoogleMapsModule } from '@angular/google-maps/';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {MatCheckboxModule} from '@angular/material/checkbox';
//import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';


import { } from 'googlemaps';
import { AddScheduleComponent } from './components/add-schedule/add-schedule.component';
import { SearchAddedMsgComponent } from './components/search-added-msg/search-added-msg.component';
import { DialogLogInComponent } from './components/dialog-log-in/dialog-log-in.component';
import { MapComponent } from './components/map/map.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
     LogInComponent,
     SignUpComponent,
     ExcComponent,
     AddPaymdetailsComponent,
     SearchResultsComponent,
     AddImidSearchComponent,
     MainComponent,
     DashboardComponent,
     DashboardComponent,
     UpdatePaymentDetailsComponent,
     AddPaymentDetailsComponent,
     UpdateUserDetailsComponent,
     FeedbackDetailsComponent,
     AddRegularSearchComponent,
     UpdateRegularSearchComponent,
     PaypalComponent,
     AddScheduleComponent,
     SearchAddedMsgComponent,
     DialogLogInComponent,
     MapComponent
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    CommonModule,
    MatRadioModule,
    MatCardModule,
    MatDividerModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    GoogleMapsModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
  //  GooglePlaceModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  entryComponents: [
    DialogLogInComponent
    
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
