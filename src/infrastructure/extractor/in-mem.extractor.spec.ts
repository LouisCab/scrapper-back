import { Company } from '../../domain/company/company';
import { CompanyInformation } from '../../domain/company/company-informations/company-information';
import { InMemInformationExtractor } from './in-mem.extractor';
import { InformationReferential } from '../../domain/referential';

describe('Extractor', () => {
  let extractor: InMemInformationExtractor;
  let referential: InformationReferential;
  const companyInformation = new CompanyInformation('property1', 'value');
  const providerCompanyInformation = new Map([
    ['fakeProvider', [companyInformation]],
  ]);
  const company = new Company('company test', providerCompanyInformation);

  beforeEach(() => {
    referential = new InformationReferential([
      { property: 'property1', selector: '', htmlMarkupAttribute: '' },
      { property: 'property2', selector: '', htmlMarkupAttribute: '' },
    ]);
    extractor = new InMemInformationExtractor(referential);
    extractor.setCompanyInformation(company);
  });

  it('should show error if there is no information gathered for specified company', async () => {
    await expect(async () => {
      await extractor.extractCompanyInformations('test');
    }).rejects.toThrowError(Error);
  });
  it('should get informations for specified company', async () => {
    const newCompany = new Company('new company', providerCompanyInformation);
    extractor.setCompanyInformation(newCompany);

    const companyInformations = await extractor.extractCompanyInformations(
      'company test',
    );
    expect(companyInformations.length).toEqual(1);
  });
  it('should get informations from a specified referential', async () => {
    const notExistingInReferential = new CompanyInformation(
      'notExisting',
      'value',
    );
    const providerNotExisting = new Map([
      ['fakeProvider', [notExistingInReferential]],
    ]);
    company.add(providerNotExisting);
    const companyInformations = await extractor.extractCompanyInformations(
      'company test',
    );

    expect(companyInformations.length).toEqual(1);
    expect(companyInformations[0]).toEqual(companyInformation);
  });
});
