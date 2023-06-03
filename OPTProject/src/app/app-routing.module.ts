import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: 'sign-in'   , component: SignInComponent },
  { path: 'sign-up'   , component: SignUpComponent },
  { path: 'home'   , component: HomeComponent },
  { path: 'formulario'   , component: FormComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'sign-in' }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
