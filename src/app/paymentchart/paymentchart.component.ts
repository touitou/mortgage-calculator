import { Component, OnInit, Inject} from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Color, Label } from 'ng2-charts';
@Component({
  selector: 'app-paymentchart',
  templateUrl: './paymentchart.component.html',
  styleUrls: ['./paymentchart.component.scss']
})
export class PaymentChartComponent implements OnInit {
    lineChartData;
    lineChartLabels;
    lineChartOptions;
    lineChartColors;
    lineChartLegend;
    lineChartPlugins;
    lineChartType;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {periods:any,dataTotalInterest:any,dataBalance:any}){
   console.log("HELLO PERIOD : " + this.data.periods);
        this.lineChartData= [
            { data: this.data.dataTotalInterest, label: 'Total Interest' },
            { data: this.data.dataBalance, label: 'Balance' }
          ];

          this.lineChartLabels = this.data.periods;

          this.lineChartOptions = {
            responsive: true,
          };

          this.lineChartColors = [
            {
              borderColor: 'black',
              backgroundColor: 'red',
            }
            ];

          this.lineChartLegend = true;
          this.lineChartPlugins = [];
          this.lineChartType = 'line';
    }

  ngOnInit(){}

}
