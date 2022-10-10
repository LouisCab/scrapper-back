import { CompanyInformation } from 'src/domain/company/company-informations/company-information';
import { InformationCrawler } from '../../domain/interfaces/crawler.interface';
import { InformationExtractor } from '../../domain/interfaces/extractor.interface';
import { InformationProvider } from '../../domain/interfaces/provider.interface';

export class LinkedinInformationProvider implements InformationProvider {
  constructor(
    private readonly extractor: InformationExtractor,
    private readonly crawler: InformationCrawler,
  ) {}

  async getCompanyInformations(
    companyName: string,
  ): Promise<CompanyInformation[]> {
    await this.crawler.reachInformationScenario(companyName);

    const informations = await this.extractor.extractCompanyInformations(
      companyName,
    );
    if (!informations) {
      throw new Error(`No information retrieved for ${companyName} input`);
    }
    return informations;
  }
}
