import { Component, Input, OnInit } from '@angular/core';
import { Supplier } from '../models/supplier';

@Component({
  selector: 'app-supplier-list-table',
  templateUrl: './supplier-list-table.component.html',
  styleUrls: ['./supplier-list-table.component.scss']
})
export class SupplierListTableComponent implements OnInit {

  @Input()
  items: Supplier[] = [];
  public columns : object[] =[];

  constructor() { }

  ngOnInit(): void {
    this.columns = this.getColumns();
  }

  private getColumns(): object[]{
    return [
      {
        name: "id",
        flexGrow: 0.5,
        prop: "id"
      },
      {
        name: "Company Name",
        prop: "companyName",
        flexGrow: 1
      },
      {
        name: "contact_Name",
        prop: "contactName",
        flexGrow: 1
      },
      {
        name: "city",
        prop: "city",
        flexGrow:0.5
      }
    ];
  }
}
