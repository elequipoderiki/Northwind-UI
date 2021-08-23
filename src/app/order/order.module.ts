import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { OrderContainerComponent } from './order-container/order-container.component';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from '../material.module';
import { OrderDetailComponent } from './order-detail/order-detail.component';



//From sharedmodule we have access to component of generic table 
//then the order container component can use it for render info 
@NgModule({
  declarations: [
    OrderContainerComponent,
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    FontAwesomeModule,
    MaterialModule
  ]
})
export class OrderModule { }
