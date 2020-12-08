export interface PaymentForm {
  mortgageAmount: number;
  mortgageRatePerPeriod: number;
  mortgageAmort: string;
  mortgageNbRepayments: number;
  mortgageRepayEvery: number;
}

export interface FormState {
  form: PaymentForm;
}
