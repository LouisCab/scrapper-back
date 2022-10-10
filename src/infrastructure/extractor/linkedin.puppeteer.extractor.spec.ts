import { CompanyInformation } from '../../domain/company/company-informations/company-information';
import { InformationCrawler } from '../../domain/interfaces/crawler.interface';
import { InformationExtractor } from '../../domain/interfaces/extractor.interface';
import { CompanyInformationsFixtures } from '../../test/CompanyInformationsFixtures';
import { LinkedinPuppeteerInformationCrawler } from '../crawler/linkedin.puppeteer.crawler';
import { LinkedinPuppeteerInformationExtractor } from './linkedin.puppeteer.extractor';
import { linkedinInformationReferential } from '../referential/linkedin.referential';

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
      linkedinInformationReferential,
      crawler,
    );
  });

  it('should retrieve all aimed information', async () => {
    await initCrawler();
    const expectedCompanyInformations =
      CompanyInformationsFixtures.simpleLinkedin365Talents.map((elem) => {
        return new CompanyInformation(elem.property, elem.content);
      });

    const companyInformations = await extractor.extractCompanyInformations();
    expect(companyInformations).toEqual(expectedCompanyInformations);
  });
});
