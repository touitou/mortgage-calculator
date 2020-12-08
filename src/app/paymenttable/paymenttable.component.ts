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
     var downPayment = 0
     var totalPayment = 0.0
     this.paymentService.calculateDownPayments().subscribe(resp => {
     downPayment = Math.round(resp.d.Result);
     totalPayment = Number(downPayment);
                      this.paymentService.amortize().subscribe(resp => {
                           console.log(resp);
                           resp.d.Result.map( row =>{
                           console.log ("ROW : " + row.interet);
                                this.elements.push({
                                    period: row.mois,
                                    principalPayment: row.capital,
                                    interestPayment: row.interet,
                                    totalPayment: totalPayment,
                                    endingBalance: row.solde
                                  });
                                  totalPayment+= downPayment;
                            }
                            );
                              this.dataSource = new MatTableDataSource<any>(this.elements);
                            });
  });

}
}
