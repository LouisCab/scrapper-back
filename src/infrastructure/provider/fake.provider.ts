import { Company } from '../../domain/company/company';
import { InformationExtractor } from '../../domain/interfaces/extractor.interface';
import { InformationProvider } from '../../domain/interfaces/provider.interface';

export class FakeInformationProvider implements InformationProvider {
  constructor(private readonly extractor: InformationExtractor) {}

  async getCompany(companyName: string): Promise<Company> {
    const informations = await this.extractor.extractCompanyInformations(companyName);
    if (!informations) {
      throw new Error(`No information retrieved for ${companyName} input`);
    }

    const company = new Company(companyName, informations);
    return company;
  }
}
