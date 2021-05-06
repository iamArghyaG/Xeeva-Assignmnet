import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from 'src/pages/user-login/user-login.component';
import { UserRegComponent } from 'src/pages/user-reg/user-reg.component';

const routes: Routes = [
  { path: 'register', component: UserRegComponent },
  { path: 'signin', component: UserLoginComponent },
  { path: '', redirectTo: 'register', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
