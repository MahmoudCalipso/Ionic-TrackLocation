import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UserModule {
  UserId: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Cin: string;
  NumTel: string;
  NumPassport: string;
  Password: string;
  TypeUser: string;
  CreatedByAdminID: number;
  token: string;
}
