import { Component,ViewChild, OnInit } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { filter, debounceTime, take } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { PaymentService } from '../paymentservice.service';
import { Observable } from "rxjs";
import { MAT_STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { MatStepper } from '@angular/material/stepper';


@Component({
  selector: "app-paymentform",
  templateUrl: "paymentform.component.html",
  styleUrls: ["paymentform.component.scss"],
  providers: [
    {
      provide: MAT_STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class PaymentFormComponent implements OnInit {
@ViewChild('stepper') stepper;
  form = this.fb.group({
    mortgageAmount: ["", [Validators.required,Validators.pattern('^\\d*$')]],
    mortgageRate: ["", [Validators.required,Validators.pattern('^\\d*$')]],
    mortgageAmort: ["", [Validators.required]],
    mortgageFreq: ["", [Validators.required]],
    mortgageTerm: ["", [Validators.required]]
  });

  amortPeriods = [];
    amortPayFreq = [];
        amortPayTerm= [];
          showPaymentTable = false;
  constructor(private paymentService: PaymentService,private fb: FormBuilder,  private translate: TranslateService) {}

  ngOnInit() {
    for (let i = 1; i <= 30; i++) {
      this.amortPeriods.push(i + (i == 1 ? " YEAR" : " YEARS"));
       if (i <=10)
                  this.amortPayTerm.push(i + (i == 1 ? " YEAR" : " YEARS"));
    }
        this.amortPayFreq.push("Weekly");
                this.amortPayFreq.push("Bi-Weekly");
                        this.amortPayFreq.push("Monthly");
                                this.amortPayFreq.push("Semi-Monthly");
  }
  submit(stepper : MatStepper) {
    if (this.form.valid) {
      this.save();
      this.showPaymentTable = true;
      stepper.next();
    }
  }

    save() {
      //this.store.dispatch(new ActionFormUpdate({ form: this.form.value }));
          this.paymentService.setData(this.form.value);
    }


  reset() {
    this.form.reset();
    this.form.clearValidators();
    this.form.clearAsyncValidators();
    //this.store.dispatch(new ActionFormReset());
  }
}
