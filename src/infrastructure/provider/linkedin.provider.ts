import { constants } from '../../constants';
import { Company } from '../../domain/company/company';
import { InformationCrawler } from '../../domain/interfaces/crawler.interface';
import { InformationExtractor } from '../../domain/interfaces/extractor.interface';
import { InformationProvider } from '../../domain/interfaces/provider.interface';

export class LinkedinInformationProvider implements InformationProvider {
  constructor(
    private readonly extractor: InformationExtractor,
    private readonly crawler: InformationCrawler
  ) {}

  async getCompany(companyName: string): Promise<Company> {
    await this.crawler.initBrowser();
    await this.crawler.goto(constants.GOOGLE_SEARCH_LINKEDIN + companyName);
    await this.crawler.consentCookies(constants.GOOGLE_CONSENT);
    await this.crawler.gotoFirstResult(constants.GOOGLE_FIRST_RESULT);

    const informations = await this.extractor.extractCompanyInformations(companyName);
    if (!informations) {
      throw new Error(`No information retrieved for ${companyName} input`);
    }

    const company = new Company(companyName, informations);
    return company;
  }
}
