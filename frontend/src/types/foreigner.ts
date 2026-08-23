export interface DateParts {
  day: string;
  month: string;
  year: string;
}

export interface ForeignerFormData {
  year: string;
  foreignerIdNo: string;
  name: string;
  age: string;
  nationality: string;
  ethnicity: string;
  certificateRegistrationNo: string;
  district: string;
  province: string;
  domicile: string;
  applicationType: string;
  amount: string;
  receiptBookNo: string;
  receiptNo: string;
  certificateNo: string;
}

export interface Foreigner {
  id: string;
  sequenceNo: number | null;
  year: number | null;

  foreignerIdNo: string | null;
  name: string;
  age: number | null;
  nationality: string | null;
  ethnicity: string | null;

  certificateRegistrationNo: string | null;
  certificateDate: string | null;

  district: string | null;
  province: string | null;
  domicile: string | null;

  applicationType: string | null;
  applicationDate: string | null;
  expirationDate: string | null;

  amount: string | number | null;

  receiptBookNo: string | null;
  receiptNo: string | null;
  receiptDate: string | null;

  certificateNo: string | null;
  petitionDate: string | null;

  createdAt?: string;
  updatedAt?: string;
}

export type ForeignerData = Foreigner;
