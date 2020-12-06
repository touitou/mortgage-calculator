export interface PaymentForm {
  mortgageAmount: double;
  mortgageRate: double;
  mortgageAmort: string;
  mortgageFreq: string;
  mortgageTerm: string;
}

export interface FormState {
  form: PaymentForm;
}
