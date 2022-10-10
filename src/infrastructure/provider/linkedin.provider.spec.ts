import { CompanyInformation } from '../../domain/company/company-informations/company-information';
import { InformationCrawler } from '../../domain/interfaces/crawler.interface';
import { InformationExtractor } from '../../domain/interfaces/extractor.interface';
import { InformationProvider } from '../../domain/interfaces/provider.interface';
import { CompanyInformationsFixtures } from '../../test/CompanyInformationsFixtures';
import { LinkedinPuppeteerInformationCrawler } from '../crawler/linkedin.puppeteer.crawler';
import { LinkedinPuppeteerInformationExtractor } from '../extractor/linkedin.puppeteer.extractor';
import { linkedinInformationReferential } from '../referential/linkedin.referential';
import { LinkedinInformationProvider } from './linkedin.provider';

describe('Linkedin com provider', () => {
  jest.setTimeout(60000);
  let crawler: InformationCrawler;
  let provider: InformationProvider;
  let extractor: InformationExtractor;

  beforeEach(() => {
    crawler = new LinkedinPuppeteerInformationCrawler();
    extractor = new LinkedinPuppeteerInformationExtractor(
      linkedinInformationReferential,
      crawler,
    );
    provider = new LinkedinInformationProvider(extractor, crawler);
  });

  it('should retrieve all aimed information on page for specified company', async () => {
    const companyName = '365Talents';
    const expectedCompanyInformations =
      CompanyInformationsFixtures.simpleLinkedin365Talents.map((elem) => {
        return new CompanyInformation(elem.property, elem.content);
      });
    const companyInformations = await provider.getCompanyInformations(
      companyName,
    );

    const filtered = companyInformations.filter((companyInformation) => {
      companyInformation.informationProperty !== 'logo';
    });
    const expectedFiltered = expectedCompanyInformations.filter(
      (companyInformation) => {
        companyInformation.informationProperty !== 'logo';
      },
    );
    // Exclude logo href of the test because url is not stable
    expect(filtered).toEqual(expectedFiltered);
  });
});
