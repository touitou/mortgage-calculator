export interface PaymentForm {
  mortgageAmount: number;
  mortgageRatePerPeriod: number;
  mortgageAmort: string;
  mortgageRepayEvery: string;
}

export interface FormState {
  form: PaymentForm;
}
