import { CompanyInformation } from 'src/domain/company/company-informations/company-information';
import { InformationExtractor } from '../../domain/interfaces/extractor.interface';
import { InformationProvider } from '../../domain/interfaces/provider.interface';

export class FakeInformationProvider implements InformationProvider {
  constructor(private readonly extractor: InformationExtractor) {}

  async getCompanyInformations(
    companyName: string,
  ): Promise<CompanyInformation[]> {
    const informations = await this.extractor.extractCompanyInformations(
      companyName,
    );
    if (!informations) {
      throw new Error(`No information retrieved for ${companyName} input`);
    }

    return informations;
  }
}
