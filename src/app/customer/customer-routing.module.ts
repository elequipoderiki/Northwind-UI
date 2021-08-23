import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../auth/role.enum';

const customerRoutes : Routes =[
  {
    path: '',

    children: [
      {
        path: '',
        component: CustomerListComponent
      }
    ], 
    canActivate: [AuthGuard],
    //roles whose values grant permissions to activate the
    //customer component
    data: { expectedRole: Role.AdminSupplier}
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(customerRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CustomerRoutingModule { }
