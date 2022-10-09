import { Company } from '../domain/company/company';
import { CompanyInformation } from '../domain/company/company-informations/company-information';
import { InMemInformationExtractor } from './in-mem.extractor';
describe('Extractor', () => {
  let extractor: InMemInformationExtractor;
  const companyInformation = new CompanyInformation('property1', 'value');
  const company = new Company('company test', [companyInformation]);
  beforeEach(() => {
    extractor = new InMemInformationExtractor();
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
