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

   //PMT(ir:number, np:number, pv:number, fv:number, type:number) {
     /*
      * ir   - interest rate per month
      * np   - number of periods (months)
      * pv   - present value
      * fv   - future value
      * type - when the payments are due:
      *        0: end of the period, e.g. end of month (default)
      *        1: beginning of period
      */
    /*var pmt:number;
     var pvif:number;

     fv || (fv = 0);
     type || (type = 0);

     if (ir === 0)
       return -(pv + fv) / np;

     pvif = Math.pow(1 + ir, np);
     pmt = -ir * pv * (pvif + fv) / (pvif - 1);

     if (type === 1)
       pmt /= (1 + ir);

     return pmt;
   }*/

  ngOnInit() {
     var data = this.paymentService.getData();
     console.log("MORTGAGE AMOUNT : " + data.mortgageAmount);
     this.paymentService.calculateDownPayments(data).subscribe(resp => {
console.log(resp);
                                                                        })
     /*var monthlyInterestRate = +((Math.pow(1 + ((data.mortgageRate / 100) / 2), 1 / 6) - 1)).toFixed(6);
     var mortgageAmortizationInMonths = Number(data.mortgageAmort.substring(0,2)) /12;
     console.log("MORTGAGE :" + data.mortgageAmort);
     var mortgagePayment = -this.PMT(monthlyInterestRate, mortgageAmortizationInMonths, data.mortgageAmount, 0, 0);
     var totalNumberOfPayments = 12 * (mortgageAmortizationInMonths) / 12;
     var numberOfPayments = Math.ceil(totalNumberOfPayments);
     var extraAnnualPayment = 0;
     var paymentInterval = 0;
     var extraPayment = 0;
     var adjustDateBy = 0;
     var adjustDateByStr = "month";
     var finalDate;
     var finalDate2;
     var interestPaidFinal = 0;
     var balance = data.mortgageAmount;
     var dueDate = new Date();
     if (data.mortgageFreq === "Monthly") {
       adjustDateBy = 1;
       adjustDateByStr = "month";
     }
     if ((data.mortgageAmount >= 10) && (mortgageAmortizationInMonths <= 420)) {
console.log("TOTO");
           for (var i = 1; i <= numberOfPayments; i++) {
console.log("TATA");
             var interestPaid = balance * monthlyInterestRate;
             var principal = (mortgagePayment - interestPaid);

             var extraPaymentFinal = 0;
             // add extra payments
             if (i && (i % paymentInterval === 0)) {
               principal = principal + extraPayment;
               extraPaymentFinal = extraPayment;
             }

             if (i && (i % 12 === 0)) { // Monthly
               principal = principal + extraAnnualPayment;
               extraPaymentFinal = extraPaymentFinal + extraAnnualPayment;
             }

             if (data.mortgageFreq === "Semi-Monthly") {
               if (i % 2 === 1) {
                 //finalDate = moment(dueDate).utc().add(adjustDateBy * (i - 1), adjustDateByStr).format('MMMM Do YYYY');
                 //finalDate2 = moment(dueDate).utc().add(adjustDateBy * (i), adjustDateByStr).add(1, 'day');
               } else {
                // finalDate = moment(dueDate).utc().add(adjustDateBy * (i - 1), adjustDateByStr).subtract(2, 'weeks').format('MMMM Do YYYY');
                // finalDate2 = moment(dueDate).utc().add(adjustDateBy * (i), adjustDateByStr).subtract(2, 'weeks').add(1, 'day');
               }
             } else {
              // finalDate = moment(dueDate).utc().add(adjustDateBy * (i - 1), adjustDateByStr).format('MMMM Do YYYY');
              // finalDate2 = moment(dueDate).utc().add(adjustDateBy * (i), adjustDateByStr).add(1, 'day');
             }


             //if ((this.PaymentFrequency === "Acc. Bi-Weekly") || (this.PaymentFrequency === "Acc. Weekly") ) {
             if (balance < principal) {

              // finalDate = moment(dueDate).utc().add(adjustDateBy * (i), adjustDateByStr).format('MMMM Do YYYY');

               this.elements.push({
                   period: i,
                   principalPayment: Number(interestPaid + balance).toFixed(2),
                   interestPayment: interestPaid.toFixed(2),
                   totalPayment: Number(balance).toFixed(2),
                   endingBalance: 0
                 });
               }
               mortgagePayment = interestPaid + balance;
               principal = balance;
               balance = 0;
               totalNumberOfPayments = i;
               interestPaidFinal = interestPaidFinal + interestPaid;

               break;
             }
             // }


             if (i === numberOfPayments) {
               mortgagePayment = interestPaid + balance;
                this.elements.push({
                    period: i,
                    principalPayment: balance.toFixed(2),
                    interestPayment: interestPaid.toFixed(2),
                    totalPayment: mortgagePayment.toFixed(2),
                    endingBalance: 0
                  });
               interestPaidFinal = interestPaidFinal + interestPaid;
               balance = balance - principal;
               //this.PayOffDate = finalDate;
               totalNumberOfPayments = numberOfPayments;
             } else {
               balance = balance - principal;
               this.elements.push({
                   period: i,
                   principalPayment: Number(principal).toFixed(2),
                   interestPayment: interestPaid.toFixed(2),
                   totalPayment: Number(mortgagePayment).toFixed(2),
                   endingBalance: balance.toFixed(2)
                 });
               interestPaidFinal = interestPaidFinal + interestPaid;
             }


             if (principal > balance) {
               principal = balance;
             }

           }
            this.dataSource = new MatTableDataSource<any>(this.elements);
            console.log("ELEMENT :" + this.elements[0] );*/
  }
}
