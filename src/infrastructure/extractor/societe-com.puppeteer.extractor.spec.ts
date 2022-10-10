import { CompanyInformation } from '../../domain/company/company-informations/company-information';
import { InformationCrawler } from '../../domain/interfaces/crawler.interface';
import { InformationExtractor } from '../../domain/interfaces/extractor.interface';
import { CompanyInformationsFixtures } from '../../test/CompanyInformationsFixtures';
import { SocieteComPuppeteerInformationExtractor } from './societe-com.puppeteer.extractor';
import { societeComInformationReferential } from '../referential/societe-com.referential';
import { SocieteComPuppeteerInformationCrawler } from '../crawler/societe-com.puppeteer.crawler';
import {
  GOOGLE_SEARCH_SOCIETE_COM,
  GOOGLE_CONSENT,
  GOOGLE_FIRST_RESULT,
} from '../referential/constants/google.constant';
import { SOCIETE_COM_CONSENT } from '../referential/constants/societe-com.constant';

describe('SocieteComPuppeteer extractor', () => {
  jest.setTimeout(60000);
  let crawler: InformationCrawler;
  let extractor: InformationExtractor;
  async function initCrawler() {
    await crawler.initBrowser();
    await crawler.goto(GOOGLE_SEARCH_SOCIETE_COM + '365Talents');
    await crawler.consentCookies(GOOGLE_CONSENT);
    await crawler.gotoFirstResult(GOOGLE_FIRST_RESULT);
    await crawler.consentCookies(SOCIETE_COM_CONSENT);
  }

  beforeAll(async () => {
    crawler = new SocieteComPuppeteerInformationCrawler();
    extractor = new SocieteComPuppeteerInformationExtractor(
      societeComInformationReferential,
      crawler,
    );
    await initCrawler();
  });

  it('should retrieve all aimed information', async () => {
    const expectedCompanyInformations =
      CompanyInformationsFixtures.simpleSocieteCom365Talents.map((elem) => {
        return new CompanyInformation(elem.property, elem.content);
      });

    const companyInformations = await extractor.extractCompanyInformations();
    expect(companyInformations).toEqual(expectedCompanyInformations);
  });
});
