import { Component, OnInit} from '@angular/core';
import { PaymentService } from '../paymentservice.service';
import { MatTableDataSource } from "@angular/material/table";
import * as moment from 'moment';

@Component({
  selector: 'app-paymenttable',
  templateUrl: './paymenttable.component.html',
  styleUrls: ['./paymenttable.component.scss']
})
export class PaymenttableComponent implements OnInit {
  displayedColumns: string[] = ['period', 'principalPayment', 'interestPayment', 'totalPayment', 'endingBalance'];
  dataSource:MatTableDataSource<any>;
  elements:any = [];
  constructor(private paymentService: PaymentService) {
  }



  ngOnInit() {

     this.paymentService.calculateDownPayments().subscribe(resp => {
     console.log(resp);
                                                                        })

  }
}
