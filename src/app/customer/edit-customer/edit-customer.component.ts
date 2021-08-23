import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WhiteSpaceValidator } from 'src/app/shared/validators/whiteSpaceValidator';
import { AddOrEditCustomer } from '../models/AddOrEditCustomer';
import { EditCustomerService } from './edit-customer.service';

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss'],
  providers: [EditCustomerService]
})
export class EditCustomerComponent implements OnInit {

  newCustomerForm: FormGroup|any;
  customer: AddOrEditCustomer|any;
  constructor(private service: EditCustomerService, private fb: FormBuilder, 
    public dialogRef: MatDialogRef<EditCustomerComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
      this.customerRetrieved(data.id);
    }

  ngOnInit(): void {
    this.buildNewCustomerForm();
  }

  buildNewCustomerForm(): void{
    this.newCustomerForm = this.fb.group({
      firstName: ['', [Validators.required, WhiteSpaceValidator.cannotContainSpace]],
      lastName: ['', Validators.compose([Validators.required, WhiteSpaceValidator.cannotContainSpace])],
      city: ['', Validators.compose([Validators.required, WhiteSpaceValidator.cannotContainSpace])],
      country: ['', Validators.compose([Validators.required, WhiteSpaceValidator.cannotContainSpace])],
      phone: ['', Validators.compose([Validators.required, WhiteSpaceValidator.cannotContainSpace])],
    });
  }

  customerRetrieved(id: number):void{
    this.service.getCustomerById(id)
    .subscribe(response => {
      this.customer =response;
      this.newCustomerForm.patchValue({
        firstName: response.firstName,
        lastName: response.lastName,
        city: response.city,
        country: response.country,
        phone: response.phone
      });
    });
  }

  save(): void{
    if (this.newCustomerForm.dirty && this.newCustomerForm.valid){
      const p = Object.assign({}, this.customer, this.newCustomerForm.value);
      p.id = this.data.id;
      this.service.editCustomer(p)
      .subscribe(response => {
        this.dialogRef.close();
      });
    } else if(!this.newCustomerForm.dirty){
      this.newCustomerForm.reset();
    }
  }
}
