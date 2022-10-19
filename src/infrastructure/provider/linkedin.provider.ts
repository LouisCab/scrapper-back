import { InformationCrawler } from '../../domain/interfaces/crawler.interface';
import { InformationExtractor } from '../../domain/interfaces/extractor.interface';
import {
  InformationProvider,
  ProviderCompanyInformation,
} from '../../domain/interfaces/provider.interface';

export class LinkedinInformationProvider implements InformationProvider {
  constructor(
    private readonly extractor: InformationExtractor,
    private readonly crawler: InformationCrawler,
  ) {}

  getClassName() {
    return this.constructor.name;
  }
  async getCompanyInformations(
    companyName: string,
  ): Promise<ProviderCompanyInformation> {
    await this.crawler.reachInformationScenario(companyName);

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
