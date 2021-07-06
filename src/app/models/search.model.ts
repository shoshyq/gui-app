import { computeDecimalDigest } from "@angular/compiler/src/i18n/digest";

export class Search{
 Code : number
 UserId : number 
 MyLocationAddress: string; 
 Place_id? : string 
 CityCode? : number
 SizeOpt? : boolean
 PreferableWidth? : number
 PreferableLength? : number
 RoofOpt? : boolean
 DaysSchedule : number
 MinPrice? : number
 MaxPrice? : number
 Regularly : boolean
 SearchDate  : Date

}