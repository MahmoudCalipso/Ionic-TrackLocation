import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CarModule {
   CarID: number;
   NameCar: string;
   Puissance: number;
   NumberPlace: number;
   Matricule: number;
   DateCirculation: Date;
   TotKm: number;
   FamilyCarID: number;
   UserID: number;
   TypeCarID: number;
}
