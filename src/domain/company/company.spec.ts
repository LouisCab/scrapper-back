import { Company } from './company';
import { CompanyInformation } from './company-informations/company-information';

describe('Company test', () => {
  const companyInformation = new CompanyInformation('firstProperty', 'value of first property');
  const company = new Company('TestCompany', [companyInformation]);
  const newProperty: CompanyInformation = new CompanyInformation(
    'second-property',
    'value of second property'
  );
  it('should add information to existing company informations', () => {
    company.add([newProperty]);
    expect(company.companyInformations.length).toEqual(2);
  });
  it('should format company informations into one', () => {
    company.add([newProperty]);
    const companyInformations = company.build();
    expect(Object.entries(companyInformations).length).toEqual(2);
  });
});
