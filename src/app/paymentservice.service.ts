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

    mortgageRatePerPeriod: number;
    mortgageAmort: string;
    mortgageNbRepayments: string;
    mortgageRepayEvery: string;

  calculateDownPayments(form :PaymentForm): Observable<any> {

  let params  = {
      "CalculMiseDeFondVersement" : 10000,
      "CalculEmpruntVersement":40000,
      "CalculAmortVersement":20,
      "CalculTauxVersement":3,
      "CalculFreqVersement":12,
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
      .append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')

      console.log("DATA : " + form.mortgageAmount);
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
