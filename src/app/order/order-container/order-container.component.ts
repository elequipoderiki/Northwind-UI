import { AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { faCaretDown, faCaretRight, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { TableViewComponent } from 'src/app/shared/table-view/table-view.component';
import { OrderList } from '../models/order-list';
import { OrderRoutingModule } from '../order-routing.module';
import { OrderContainerService } from './order-container.service';

@Component({
  selector: 'app-order-container',
  templateUrl: './order-container.component.html',
  styleUrls: ['./order-container.component.scss'],

  providers: [OrderContainerService]
})

//instead of include all this behavior in table view component we
//separate logic to render the table into an specific component
//for reusability and for robustness

export class OrderContainerComponent implements OnInit, AfterViewInit {

  //font awesome icons
  facaretdown = faCaretDown;  
  facaretright = faCaretRight;

  items: OrderList[] = [];
  public columns : object[] = [];
  public detailColumns: object[] = [];
  //decorator that allows manipulate the tableview table
  @ViewChild("tableView") tableView: TableViewComponent<any> |any;
  @ViewChild("orderIdCellTemplate") private orderIdCellTemplate: TemplateRef<any> |any;
  @ViewChild("orderNumberCellTemplate") private orderNumberCellTemplate: TemplateRef<any> | any;

  numberOfRecords = 0;
  pageSizeOptions: number[] = [10,20,30];
  pageSize = 10;
  pageIndex = 0;

  constructor(private service: OrderContainerService, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getOrders(1,10);
  }
  
  ngAfterViewInit() : void{
    this.columns = this.getColumns();
    this.detailColumns = this.getDetailsColumns();
    this.ref.detectChanges();
  }

  getOrders(page: number, rows: number):void{
    this.service.getOrderList(page, rows)
    .subscribe(response => {
      this.items = response;
      this.numberOfRecords = response[0].totalRecords;
    });
  }

  changePage(event: any): void {
    this.getOrders(event.pageIndex + 1, event.pageSize);
  }

  toggleExpandRow(row: any){
    this.tableView.toggleExpandRow(row);
    this.ref.detectChanges();
  }

  private getColumns(): object[]{
    return [
      {
        name: "Id",
        flexGrow: 0.5,
        cellTemplate: this.orderIdCellTemplate
      },
      {
        name: "Customer",
        prop: "customer",
        flexGrow: 1
      },
      {
        name: "Total",
        prop: "totalAmount",
        flexGrow: 0.5
      },
      {
        name: "# Order",
        cellTemplate: this.orderNumberCellTemplate,
        flexGrow: 0.5
      }
    ];
  }

  private getDetailsColumns(): object[]{
    return [
      {
        name:"Product",
        flexGrow: 0.5,
        prop: "productName"
      },
      {
        name: "unitPrice",
        prop: "unitPrice",
        flexGrow: 0.5
      },
      {
        name: "quantity",
        prop: "quantity",
        flexGrow: 0.5
      }
    ];
  }
}
