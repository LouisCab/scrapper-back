import { CompanyInformation } from './company-information';

describe('Company information test', () => {
  it('should build company informations in a simple object', () => {
    const companyInformation = new CompanyInformation('test', 'test value');
    const builded = companyInformation.build();
    expect(builded).toEqual({ test: 'test value' });
  });

  it('should extract content with specified regex extractor', () => {
    const companyInformation = new CompanyInformation(
      'testOnNumber',
      'test 123 test',
    );
    const expectedCompanyInformation = new CompanyInformation(
      'testOnNumber',
      '123',
    );
    const regex = new RegExp(/([\d|-]+)/);
    companyInformation.refineContent(regex);
    expect(companyInformation).toEqual(expectedCompanyInformation);
  });
});
