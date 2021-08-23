import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  //note that this selector can be used to render component view
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})

export class TableViewComponent<T> implements OnInit {
  //this decorated fields are bound to a dom property in the template
  // html. On changes they update to the dom's property values
  @Input() minTableHeight: number = 500;
  @Input() items: any| object[] = [] ;
  // @Input() columns : object[] = [ ];
  @Input() columns : any[] = [ ];
  @Input() limit?: number;
  @Input() detailTemplate: any| TemplateRef<any>;
  @ViewChild('myTable') table: any;

  constructor() { }

  ngOnInit(): void {
  }

  toggleExpandRow(row:any){
    this.table.rowDetail.toggleExpandRow(row);
  }

}
