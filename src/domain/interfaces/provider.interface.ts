import { Company } from '../company/company';
import { CompanyInformation } from '../company/company-informations/company-information';

export interface InformationProvider {
  getCompany(companyName: string): Company;
}
