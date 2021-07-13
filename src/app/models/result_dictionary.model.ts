import { ParkSpot } from "./parkspot.model"

export class Result_Dictionary{
  
    PSpot : ParkSpot
    Distance : string
}
interface Dictionary<T> {
    [Key: string]: T;
}