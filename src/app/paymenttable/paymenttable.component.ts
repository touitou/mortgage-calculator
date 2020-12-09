import { Component, OnInit,Input} from '@angular/core';
import { PaymentService } from '../paymentservice.service';
import { MatTableDataSource } from "@angular/material/table";
import { PaymentChartComponent } from '../paymentchart/paymentchart.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-paymenttable',
  templateUrl: './paymenttable.component.html',
  styleUrls: ['./paymenttable.component.scss']
})
export class PaymentTableComponent implements OnInit {
  displayedColumns: string[] = ['period', 'principalPayment', 'interestPayment', 'totalPayment', 'endingBalance'];
  dataSource = new MatTableDataSource<any>();
  elements:any = [];
  dataBalance:any = [];
  periods:any = [];
  principals :any = [];
  dataTotalInterest:any = [];
  constructor(private paymentService: PaymentService,private dialog :MatDialog) {
  }

ngOnInit() {
        this.refresh();
    }

    viewChart(){
       console.log("PERIODS :" + this.periods);
          let dialogRef = this.dialog.open(PaymentChartComponent, {
            height: '400px',
            width: '600px',
            data: { periods: this.periods, dataTotalInterest:this.dataTotalInterest,dataBalance:this.dataBalance, principal: this.principals},
          });
       //chartChild.refresh(this.periods,this.dataTotalInterest,this.dataBalance);
    }
refresh(){
     var downPayment = 0
     var totalPayment = 0.0
     this.paymentService.calculateDownPayments().subscribe(resp => {
     downPayment = Math.round(resp.d.Result);
     totalPayment = Number(downPayment);
                      this.paymentService.amortize().subscribe(resp => {
                           console.log(resp);
                           resp.d.Result.map( row =>{
                           console.log ("ROW : " + row.interet);
                              this.periods.push(row.mois);
                              this.dataTotalInterest.push(row.interet.replace("$",""));
                              this.principals.push(row.capital.replace("$",""));
                              this.dataBalance.push(row.solde.replace("$","").replace(/\s/g, ""));
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
                              this.dataSource=this.elements;
                            });
  });
}

}
