import { CompanyInformation } from '../../domain/company/company-informations/company-information';
import { InformationCrawler } from '../../domain/interfaces/crawler.interface';
import { InformationExtractor } from '../../domain/interfaces/extractor.interface';
import { CompanyInformationsFixtures } from '../../test/CompanyInformationsFixtures';
import { societeComInformationReferential } from '../referential/societe-com.referential';
import { LinkedinPuppeteerInformationCrawler } from '../crawler/linkedin.puppeteer.crawler';
import { LinkedinPuppeteerInformationExtractor } from './linkedin.puppeteer.extractor';

describe('LinkedinPuppeteer extractor', () => {
  jest.setTimeout(60000);
  let crawler: InformationCrawler;
  let extractor: InformationExtractor;
  async function initCrawler() {
    await crawler.initBrowser();
    await crawler.reachInformationScenario('365Talents');
  }

  beforeAll(async () => {
    crawler = new LinkedinPuppeteerInformationCrawler();
    extractor = new LinkedinPuppeteerInformationExtractor(
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
