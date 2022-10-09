import { CompanyInformation } from '../company/company-informations/company-information';

export abstract class InformationExtractor {
  abstract extractCompanyInformations(companyName: string): CompanyInformation[];
}
