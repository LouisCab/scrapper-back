import { CompanyInformation } from '../company/company-informations/company-information';
export type ProviderCompanyInformation = Map<string, CompanyInformation[]>;

export interface InformationProvider {
  getCompanyInformations(
    companyName: string,
  ): Promise<ProviderCompanyInformation>;
  getClassName(): string;
}
