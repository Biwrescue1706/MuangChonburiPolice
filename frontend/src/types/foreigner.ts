export interface DateParts {
  day: string;
  month: string;
  year: string;
}

export interface ForeignerFormData {
  year: string;
  foreignerIdNo: string;
  prefix: string;
  firstName: string;
  lastName: string;
  age: string;
  nationality: string;
  ethnicity: string;
  certificateRegistrationNo: string;
  district: string;
  province: string;
  policeStation: string;
  policeProvince: string;
  houseNo: string;
  moo: string;
  road: string;
  subdistrict: string;
  domicileDistrict: string;
  domicileProvince: string;
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

  prefix: string | null;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;

  age: number | null;
  nationality: string | null;
  ethnicity: string | null;
  certificateRegistrationNo: string | null;
  certificateDate: string | null;
  district: string | null;
  province: string | null;

  policeStation: string;
  policeProvince: string;

  houseNo: string | null;
  moo: string | null;
  road: string | null;
  subdistrict: string | null;
  domicileDistrict: string | null;
  domicileProvince: string | null;
  domicile: string | null;

  applicationType: string | null;
  applicationDate: string | null;

  expirationDate: string | null;

  previousExpirationDate: string | null;

  amount: string | number | null;

  amountText: string | null;
  receiptBookNo: string | null;
  receiptNo: string | null;
  receiptDate: string | null;
  certificateNo: string | null;
  petitionDate: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export type ForeignerData = Foreigner;
