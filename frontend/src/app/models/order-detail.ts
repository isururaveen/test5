import { Customer } from './customer';
import { CartProduct } from './cart-product';

export class OrderDetail {
    User: Customer;
    Cart: CartProduct[];
    Remarks: string;
    Shipping_id:string;
    TotalAmount: number;
}
