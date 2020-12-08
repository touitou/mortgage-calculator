import {Injectable,Optional} from '@angular/core';
import {PaymentForm} from './paymentform/paymentform.model';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable,throwError, of, empty} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import { retry, catchError } from 'rxjs/operators'
import * as moment from 'moment';
import {environment} from 'src/environments/environment'


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
   if ( this.data.mortgageRepayEvery=="weekly")  factor = 4.33;
   if ( this.data.mortgageRepayEvery=="bi-weekly")  factor = 2.17;
   if ( this.data.mortgageRepayEvery=="bi-monthly") factor = 2;

   let params  = {
          "taux": this.data.mortgageRatePerPeriod/factor,
          "freq": 12,
          "amort": Number(this.data.mortgageAmort.substring(0,2))*factor,
          "emprunt": this.data.mortgageAmount
      }

       var headers = new HttpHeaders()
       .append('Content-Type', 'application/json')
       .append('Accept', 'application/json')

       console.log("DATA : " + this.data.mortgageAmount);


       return this.http.post(`${environment.apiurl}/GetMortgageRepaymentsArray`, params,{headers})
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
           "CalculMiseDeFondVersement" : Number(this.data.mortgageAmount),
           "CalculEmpruntVersement":0,
           "CalculAmortVersement":Number(this.data.mortgageAmort.substring(0,2)),
           "CalculTauxVersement":Number(this.data.mortgageRatePerPeriod),
           "CalculFreqVersement":Number(frequency),
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

           console.log("DATA : " + this.data.mortgageAmount);

           return this.http.post(`${environment.apiurl}/CalculMntVersement`, params,{headers})
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
