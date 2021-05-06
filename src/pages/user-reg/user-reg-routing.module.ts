import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegComponent } from './user-reg.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRegRoutingModule { }
