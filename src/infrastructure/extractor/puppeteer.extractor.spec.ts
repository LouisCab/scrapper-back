import { constants } from '../../constants';
import { Company } from '../../domain/company/company';
import { CompanyInformation } from '../../domain/company/company-informations/company-information';
import { InformationCrawler } from '../../domain/interfaces/crawler.interface';
import { InformationExtractor } from '../../domain/interfaces/extractor.interface';
import { InformationProvider } from '../../domain/interfaces/provider.interface';
import { CompanyInformationsFixtures } from '../../test/CompanyInformationsFixtures';
import { PuppeteerInformationCrawler } from '../crawler/puppeteer.crawler';
import { PuppeteerInformationExtractor } from './puppeteer.extractor';
import { societeComInformationReferential } from '../referential/societe-com.referential';

describe('Puppeteer extractor', () => {
  jest.setTimeout(60000);
  let crawler: InformationCrawler;
  let extractor: InformationExtractor;
  async function initCrawler() {
    await crawler.initBrowser();
    await crawler.goto(constants.GOOGLE_SEARCH_SOCIETE_COM + '365Talents');
    await crawler.consentCookies(constants.GOOGLE_CONSENT);
    await crawler.gotoFirstResult(constants.GOOGLE_FIRST_RESULT);
    await crawler.consentCookies(constants.SOCIETE_COM_CONSENT);
  }

  beforeAll(async () => {
    crawler = new PuppeteerInformationCrawler();
    extractor = new PuppeteerInformationExtractor(societeComInformationReferential, crawler);
    await initCrawler();
  });

  it('should retrieve all aimed information', async () => {
    const expectedCompanyInformations = CompanyInformationsFixtures.simpleSocieteCom365Talents.map(
      (elem) => {
        return new CompanyInformation(elem.property, elem.content);
      }
    );

    const companyInformations = await extractor.extractCompanyInformations();
    expect(companyInformations).toEqual(expectedCompanyInformations);
  });
});
