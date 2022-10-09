import { Company } from '../domain/company/company';
import { CompanyInformation } from '../domain/company/company-informations/company-information';
import { InMemInformationExtractor } from './in-mem.extractor';
import { InformationReferential } from '../domain/referential';

describe('Extractor', () => {
  let extractor: InMemInformationExtractor;
  let referential: InformationReferential;
  const companyInformation = new CompanyInformation('property1', 'value');
  const company = new Company('company test', [companyInformation]);

  beforeEach(() => {
    referential = new InformationReferential([
      { property: 'property1' },
      { property: 'property2' },
    ]);
    extractor = new InMemInformationExtractor(referential);
    extractor.setCompanyInformation(company);
  });

  it('should show error if there is no information gathered for specified company', () => {
    expect(() => {
      extractor.extractCompanyInformations('test');
    }).toThrowError(Error);
  });
  it('should get informations for specified company', () => {
    const newCompany = new Company('new company', [companyInformation]);
    extractor.setCompanyInformation(newCompany);

    const companyInformations = extractor.extractCompanyInformations('company test');
    expect(companyInformations.length).toEqual(1);
  });
  it('should get informations from a specified referential', () => {
    const notExistingInReferential = new CompanyInformation('notExisting', 'value');
    company.add([notExistingInReferential]);
    const companyInformations = extractor.extractCompanyInformations('company test');

    expect(companyInformations.length).toEqual(1);
    expect(companyInformations[0]).toEqual(companyInformation);
  });
});
