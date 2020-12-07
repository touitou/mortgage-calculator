export interface PaymentForm {
  mortgageAmount: number;
  mortgageRate: number;
  mortgageAmort: string;
  mortgageFreq: string;
  mortgageTerm: string;
}

export interface FormState {
  form: PaymentForm;
}
