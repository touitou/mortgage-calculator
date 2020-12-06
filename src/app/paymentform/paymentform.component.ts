import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { filter, debounceTime, take } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { MAT_STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
@Component({
  selector: "app-paymentform",
  templateUrl: "paymentform.component.html",
  styleUrls: ["paymentform.component.css"],
  providers: [
    {
      provide: MAT_STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class PaymentFormComponent implements OnInit {
  form = this.fb.group({
    mortgageAmount: ["", [Validators.required]],
    mortgageRate: ["", [Validators.required]],
    mortgageAmort: ["", [Validators.required]],
    mortgageFreq: ["", [Validators.required]],
    mortgageTerm: ["", [Validators.required]]
  });

  amortPeriods = [];

  constructor(private fb: FormBuilder, private translate: TranslateService) {}

  ngOnInit() {
    for (let i = 1; i <= 30; i++) {
      this.amortPeriods.push(i + (i == 1 ? " YEAR" : " YEARS"));
    }
  }
  submit() {
    if (this.form.valid) {
      //this.save();
    }
  }
  reset() {
    this.form.reset();
    this.form.clearValidators();
    this.form.clearAsyncValidators();
    //this.store.dispatch(new ActionFormReset());
  }
}
