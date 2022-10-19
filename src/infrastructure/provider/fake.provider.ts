import { CompanyInformation } from 'src/domain/company/company-informations/company-information';
import { InformationExtractor } from '../../domain/interfaces/extractor.interface';
import {
  InformationProvider,
  ProviderCompanyInformation,
} from '../../domain/interfaces/provider.interface';

export class FakeInformationProvider implements InformationProvider {
  constructor(private readonly extractor: InformationExtractor) {}
  getClassName() {
    return this.constructor.name;
  }
  async getCompanyInformations(
    companyName: string,
  ): Promise<ProviderCompanyInformation> {
    const informations = await this.extractor.extractCompanyInformations(
      companyName,
    );
    if (!informations) {
      throw new Error(`No information retrieved for ${companyName} input`);
    }

    const providerCompanyInformations = new Map([
      [this.getClassName(), informations],
    ]);

    return providerCompanyInformations;
  }
}
