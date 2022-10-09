import { Company } from '../../domain/company/company';
import { CompanyInformation } from '../../domain/company/company-informations/company-information';
import { InformationCrawler } from '../../domain/interfaces/crawler.interface';
import { InformationExtractor } from '../../domain/interfaces/extractor.interface';
import { InformationProvider } from '../../domain/interfaces/provider.interface';
import { CompanyInformationsFixtures } from '../../test/CompanyInformationsFixtures';
import { PuppeteerInformationCrawler } from '../crawler/puppeteer.crawler';
import { PuppeteerInformationExtractor } from '../extractor/puppeteer.extractor';
import { societeComInformationReferential } from '../referential/societe-com.referential';
import { FakeInformationProvider } from './fake.provider';
import { SocieteComInformationProvider } from './societe-com.provider';

describe('Societe com provider', () => {
  let crawler: InformationCrawler;
  let provider: InformationProvider;
  let extractor: InformationExtractor;

  beforeEach(() => {
    crawler = new PuppeteerInformationCrawler();
    extractor = new PuppeteerInformationExtractor(societeComInformationReferential, crawler);
    provider = new SocieteComInformationProvider(extractor, crawler);
  });
  it('should retrieve all aimed information on page for specified company', async () => {
    const companyName = '365Talents';
    const companyInformations = CompanyInformationsFixtures.simpleSocieteCom365Talents;
    const company = await provider.getCompany(companyName);

    const expectedCompany = new Company(
      companyName,
      companyInformations.map((elem) => {
        return new CompanyInformation(elem.property, elem.content);
      })
    );

    expect(company).toEqual(expectedCompany);
  });
});
