import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CityComponent} from './components/city/city.component';
import {CityDetailComponent} from './components/city-detail/city-detail.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'city', pathMatch: 'full'
  },
  {
    path: 'city', component: CityComponent
  },
  {
    path: 'city-detail', component: CityDetailComponent
  },
  {
    path: 'city-detail/:cityId', component: CityDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
