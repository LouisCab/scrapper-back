import { CompanyInformation } from '../company/company-informations/company-information';

export interface InformationProvider {
  getCompanyInformations(companyName: string): Promise<CompanyInformation[]>;
}
