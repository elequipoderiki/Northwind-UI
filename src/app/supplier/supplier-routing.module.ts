import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../auth/auth.guard';
import { SupplierContainerComponent } from './supplier-container.component';
import { Role } from '../auth/role.enum';
import { RouterModule, Routes } from '@angular/router';

const supplierRoutes: Routes = [
  {
    path: '',
    
    children: [
      {
        path: '',
        component: SupplierContainerComponent
      }
    ],
    canActivate : [AuthGuard],
    data: {expectedRole: Role.AdminSupplier}
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(supplierRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SupplierRoutingModule { }
