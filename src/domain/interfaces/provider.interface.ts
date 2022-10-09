import { Company } from '../company/company';

export interface InformationProvider {
  getCompany(companyName: string): Promise<Company>;
}
