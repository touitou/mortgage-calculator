export interface PaymentForm {
  mortgageAmount: number;
  mortgageRatePerPeriod: number;
  mortgageAmort: number;
  mortgageRepayEvery: string;
}

export interface FormState {
  form: PaymentForm;
}
