import { Company } from '../../domain/company/company';
import { CompanyInformation } from '../../domain/company/company-informations/company-information';
import { InformationCrawler } from '../../domain/interfaces/crawler.interface';
import { InformationExtractor } from '../../domain/interfaces/extractor.interface';
import { InformationProvider } from '../../domain/interfaces/provider.interface';
import { CompanyInformationsFixtures } from '../../test/CompanyInformationsFixtures';
import { PuppeteerInformationCrawler } from '../crawler/puppeteer.crawler';
import { PuppeteerInformationExtractor } from '../extractor/puppeteer.extractor';
import { societeComInformationReferential } from '../referential/societe-com.referential';
import { SocieteComInformationProvider } from './societe-com.provider';

describe('Societe com provider', () => {
  jest.setTimeout(60000);
  let crawler: InformationCrawler;
  let provider: InformationProvider;
  let extractor: InformationExtractor;

  beforeEach(() => {
    crawler = new PuppeteerInformationCrawler();
    extractor = new PuppeteerInformationExtractor(
      societeComInformationReferential,
      crawler,
    );
    provider = new SocieteComInformationProvider(extractor, crawler);
  });
  it('should retrieve all aimed information on page for specified company', async () => {
    const companyName = '365Talents';
    const expectedCompanyInformations =
      CompanyInformationsFixtures.simpleSocieteCom365Talents;
    const companyInformations = await provider.getCompanyInformations(
      companyName,
    );

    expect(companyInformations).toEqual(expectedCompanyInformations);
  });
});
