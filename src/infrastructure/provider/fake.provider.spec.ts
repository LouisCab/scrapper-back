import { InMemInformationExtractor } from '../in-mem.extractor';
import { Company } from '../../domain/company/company';
import { CompanyInformation } from '../../domain/company/company-informations/company-information';
import { InformationProvider } from '../../domain/interfaces/provider.interface';
describe('Information provider', () => {
  let provider: InformationProvider;
  let extractor: InMemInformationExtractor;
  const companyInformation = new CompanyInformation('key', 'value');
  const company = new Company('company test', [companyInformation]);
  beforeEach(() => {
    
    extractor = new InMemInformationExtractor();
    provider = new FakeInformationProvider(extractor);
    extractor.setCompanyInformation(company);
  });

  it('should show error if there is no information gathered for specified company', () => {
    expect(() => {
      provider.getCompany('test');
    }).toThrowError(Error);
  });
  it('should get informations for specified company', () => {
    const newCompany = new Company('new company', [companyInformation]);
    extractor.setCompanyInformation(newCompany);

    const company = provider.getCompany('company test');
    expect(company.companyInformations.length).toEqual(1);
    expect(company.name).toEqual('company test');
  });
});
