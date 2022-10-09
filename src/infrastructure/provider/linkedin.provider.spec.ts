import { Company } from '../../domain/company/company';
import { CompanyInformation } from '../../domain/company/company-informations/company-information';
import { InformationCrawler } from '../../domain/interfaces/crawler.interface';
import { InformationExtractor } from '../../domain/interfaces/extractor.interface';
import { InformationProvider } from '../../domain/interfaces/provider.interface';
import { CompanyInformationsFixtures } from '../../test/CompanyInformationsFixtures';
import { PuppeteerInformationCrawler } from '../crawler/puppeteer.crawler';
import { PuppeteerInformationExtractor } from '../extractor/puppeteer.extractor';
import { linkedinInformationReferential } from '../referential/linkedin.referential';
import { LinkedinInformationProvider } from './linkedin.provider';

describe('Societe com provider', () => {
  let crawler: InformationCrawler;
  let provider: InformationProvider;
  let extractor: InformationExtractor;

  beforeEach(() => {
    crawler = new PuppeteerInformationCrawler();
    extractor = new PuppeteerInformationExtractor(linkedinInformationReferential, crawler);
    provider = new LinkedinInformationProvider(extractor, crawler);
  });
  it('should retrieve all aimed information on page for specified company', async () => {
    const companyName = '365Talents';
    const companyInformations = CompanyInformationsFixtures.simpleLinkedin365Talents;
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
