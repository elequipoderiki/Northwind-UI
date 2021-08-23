export class OrderList {
  orderId: number | any;
  orderDate: string | any;
  orderNumber: number | any;
  customerId: number | any;
  customer: string | any;
  totalAmount: number | any;
  totalRecords: number | any;
  orderDetails: OrderItemList[] | any;
}

export class OrderItemList {
  id : number | any;
  orderId: number | any;
  productId: number | any;
  productName: string | any;
  unitPrice: number | any;
  quantity: number | any;
}