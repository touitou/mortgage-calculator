import {Injectable,Optional} from '@angular/core';
import {PaymentForm} from './paymentform/paymentform.model';

@Injectable()
export class PaymentService {

  constructor() {}

   private data : PaymentForm;

  setData(data: PaymentForm){
    this.data = data;
  }

  getData(){
    let temp = this.data;
    this.clearData();
    return temp;
  }

  clearData(){
    this.data = undefined;
  }
}
