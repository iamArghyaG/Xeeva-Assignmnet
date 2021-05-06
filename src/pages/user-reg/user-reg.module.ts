import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRegRoutingModule } from './user-reg-routing.module';
import { UserRegComponent } from './user-reg.component';


@NgModule({
  declarations: [
    UserRegComponent
  ],
  imports: [
    CommonModule,
    UserRegRoutingModule
  ]
})
export class UserRegModule { }
