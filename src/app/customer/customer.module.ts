import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { DetailCustomerComponent } from './detail-customer/detail-customer.component';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [
    CustomerListComponent,
    NewCustomerComponent,
    EditCustomerComponent,
    DetailCustomerComponent
  ],
  //set of components that are compiled when this module is defined
  //then those can be dinamically loaded 
  entryComponents: [NewCustomerComponent, EditCustomerComponent, DetailCustomerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerRoutingModule,
    MaterialModule
  ]
})
export class CustomerModule { }
