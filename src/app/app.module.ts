import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatStepperModule } from '@angular/material/stepper';
import {CdkTreeModule} from '@angular/cdk/tree';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {CdkTableModule} from '@angular/cdk/table';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import { ChartsModule } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { PaymentFormComponent } from './paymentform/paymentform.component';
import { PaymentTableComponent } from './paymenttable/paymenttable.component';
import { StoreModule } from '@ngrx/store';
import { PaymentService } from './paymentservice.service';
import { PaymentChartComponent } from './paymentchart/paymentchart.component';


@NgModule({
  declarations: [
    AppComponent,
    PaymentFormComponent,
    PaymentTableComponent,
    PaymentChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatStepperModule,
    CdkTreeModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    CdkTableModule,
    MatDialogModule,
    ChartsModule,
    MatDialogModule,
    MatIconModule,
    HttpClientModule,
     TranslateModule.forRoot({
              loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
              },
              isolate: true
            }),
     StoreModule.forRoot({}, {}),
  ],
  providers: [PaymentService,{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `./assets/i18n/`,
    '.json'
  );
}
