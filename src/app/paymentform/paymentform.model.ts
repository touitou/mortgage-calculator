export interface PaymentForm {
  mortgageAmount: number;
  mortgageRatePerPeriod: number;
  mortgageAmort: string;
  mortgageRepayEvery: number;
}

export interface FormState {
  form: PaymentForm;
}
