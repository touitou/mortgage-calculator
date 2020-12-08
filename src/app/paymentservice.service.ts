import {Injectable,Optional} from '@angular/core';
import {PaymentForm} from './paymentform/paymentform.model';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable,throwError, of, empty} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import { retry, catchError } from 'rxjs/operators'
import * as moment from 'moment';

@Injectable()
export class PaymentService  {

  constructor(private http: HttpClient) {}

  private handleError(error: any) {
    console.log(error);
    return throwError(error);
  }
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



  amortize(): Observable<any> {
 //["weekly","bi-weekly","bi-monthly","monthly"]

   let factor = 1 ;
   if ( this.data.mortgageRepayEvery=="weekly")  frequency = 4.33;
   if ( this.data.mortgageRepayEvery=="bi-weekly")  frequency = 2.17;
   if ( this.data.mortgageRepayEvery=="bi-monthly") frequency = 2;

   let params  = {
          "taux": this.data.mortgageRatePerPeriod/frequency,
          "freq": frequency,
          "amort": this.data.mortgageAmort*frequency,
          "emprunt": this.data.mortgageAmount
      }

       var headers = new HttpHeaders()
       .append('Content-Type', 'application/json')
       .append('Accept', 'application/json')
       .append('Access-Control-Allow-Origin', 'http://localhost:4200')
       .append('Access-Control-Allow-Methods', '*')

       console.log("DATA : " + this.data.mortgageAmount);


       return this.http.post('https://www.centris.ca/Calculator/GetMortgageRepaymentsArray', params,{headers})
       .pipe(
         tap((response: any) => {
         console.log(response);
           return response;
         }),catchError(err => {
             console.log(err);
             return of(null);
               })
         );
     }


  calculateDownPayments(): Observable<any> {
     //["weekly","bi-weekly","bi-monthly","monthly"]

       let frequency =12;
       if ( this.data.mortgageRepayEvery=="weekly")  frequency = 52;
        if ( this.data.mortgageRepayEvery=="bi-weekly")  frequency = 26;
        if ( this.data.mortgageRepayEvery=="bi-monthly") frequency = 24;


       let params  = {
           "CalculMiseDeFondVersement" : this.data.mortgageAmount,
           "CalculEmpruntVersement":0,
           "CalculAmortVersement":this.data.mortgageAmort,
           "CalculTauxVersement":this.data.mortgageRatePerPeriod,
           "CalculFreqVersement":frequency,
           "TaxeProprieteVersement":0,
           "TaxeEvalMunicipaleTotale":0,
           "TaxeCityId":"",
           "TaxeCalcConfigId": "default",
           "EmpruntAmort":0,
           "EmpruntTaux":0,
           "EmpruntCalculFreq":12,
           "EmpruntVersement":0
          }

           var headers = new HttpHeaders()
           .append('Content-Type', 'application/json')
           .append('Accept', 'application/json')
           .append('Access-Control-Allow-Origin', 'http://localhost:4200')
           .append('Access-Control-Allow-Methods', '*')

           console.log("DATA : " + this.data.mortgageAmount);


           return this.http.post('https://www.centris.ca/Calculator/CalculMntVersement', params,{headers})
           .pipe(
             tap((response: any) => {
             console.log(response);
               return response;
             }),catchError(err => {
                 console.log(err);
                 return of(null);
                   })
             );
         }
}
