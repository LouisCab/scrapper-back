import { InMemInformationExtractor } from '../extractor/in-mem.extractor';
import { Company } from '../../domain/company/company';
import { CompanyInformation } from '../../domain/company/company-informations/company-information';
import { FakeInformationProvider } from './fake.provider';
import { InformationReferential } from '../../domain/referential';
import { InformationProvider } from '../../domain/interfaces/provider.interface';

describe('Information provider', () => {
  let provider: InformationProvider;
  let extractor: InMemInformationExtractor;
  let referential: InformationReferential;
  const companyInformation = new CompanyInformation('key', 'value');
  const company = new Company('company test', [companyInformation]);

  beforeEach(() => {
    referential = new InformationReferential([
      { property: 'key', selector: '', htmlMarkupAttribute: '' },
    ]);
    extractor = new InMemInformationExtractor(referential);
    provider = new FakeInformationProvider(extractor);
    extractor.setCompanyInformation(company);
  });

  it('should show error if there is no information gathered for specified company', async () => {
    await expect(async () => {
      await provider.getCompanyInformations('company not settled');
    }).rejects.toThrowError(Error);
  });
  it('should get informations for specified company', async () => {
    const newCompany = new Company('new company', [companyInformation]);
    extractor.setCompanyInformation(newCompany);

    const companyInformations = await provider.getCompanyInformations(
      'company test',
    );
    expect(companyInformations.length).toEqual(1);
  });
});
