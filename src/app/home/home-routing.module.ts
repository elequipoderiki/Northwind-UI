import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeContainerComponent } from './home-container.component';
import { HomeOpcion2Component } from './home-opcion2/home-opcion2.component';

const homeRoutes : Routes = [
  {
    path: '',
    component: HomeContainerComponent,
    children: [
      {
        path: '',
        //because it needs to map home component then imports it.
        //next, it maps empty path to the component one because
        //the whole path already has been setted to home, in app
        //routing module (it is a child route)
        component: HomeComponent
      },
      {
        path: 'home2',
        component: HomeOpcion2Component
      }
    ]
  }
];

@NgModule({
 
  imports: [
    //this route provide additional routes and is intended for 
    //feature modules. need directives such as RouterLink
     RouterModule.forChild(homeRoutes)
  ],
  exports : [RouterModule]
})
export class HomeRoutingModule { }
