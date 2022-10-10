import { CompanyInformation } from 'src/domain/company/company-informations/company-information';
import { constants } from '../../constants';
import { InformationCrawler } from '../../domain/interfaces/crawler.interface';
import { InformationExtractor } from '../../domain/interfaces/extractor.interface';
import { InformationProvider } from '../../domain/interfaces/provider.interface';

export class SocieteComInformationProvider implements InformationProvider {
  constructor(
    private readonly extractor: InformationExtractor,
    public readonly crawler: InformationCrawler,
  ) {}
  async getCompanyInformations(
    companyName: string,
  ): Promise<CompanyInformation[]> {
    await this.crawler.initBrowser();
    await this.crawler.goto(constants.GOOGLE_SEARCH_SOCIETE_COM + companyName);
    await this.crawler.consentCookies(constants.GOOGLE_CONSENT);
    await this.crawler.gotoFirstResult(constants.GOOGLE_FIRST_RESULT);
    await this.crawler.consentCookies(constants.SOCIETE_COM_CONSENT);

    const informations = await this.extractor.extractCompanyInformations(
      companyName,
    );
    if (!informations) {
      throw new Error(`No information retrieved for ${companyName} input`);
    }

    return informations;
  }
}
