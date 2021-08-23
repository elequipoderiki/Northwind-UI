import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes : Routes = [
  {
    //home module is meant to be lazy-loaded, then here we only 
    //add  the route home to the array of route configurations.
    //note the dynamic import of home.module
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    //declaring authguard (class) as token where to look up handlers 
    //in order to determine if current user is allowed to load the 
    //resource (note that loading differs from activating the 
    //component)
    canLoad: [AuthGuard]
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'supplier',
    loadChildren: () => import('./supplier/supplier.module').then(m => m.SupplierModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: '', 
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**', 
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    //it is root routing module, then configure all the routes
    //given in appRoutes configuration
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
