import { ProviderCompanyInformation } from '../interfaces/provider.interface';
import { Company } from './company';
import { CompanyInformation } from './company-informations/company-information';

describe('Company test', () => {
  const testProvider = 'TestProvider';
  const companyInformation = new CompanyInformation(
    'firstProperty',
    'value of first property',
  );

  const providerInformations: ProviderCompanyInformation = new Map([
    [testProvider, [companyInformation]],
  ]);
  const company = new Company(testProvider, providerInformations);

  const newCompanyInformations: CompanyInformation = new CompanyInformation(
    'second-property',
    'value of second property',
  );
  const newProviderInformations: ProviderCompanyInformation = new Map([
    [testProvider, [newCompanyInformations]],
  ]);
  it('should add information to existing company informations', () => {
    company.add(newProviderInformations);
    const receivedCompanyInformations =
      company.providerCompanyInformations.get(testProvider);

    expect(receivedCompanyInformations.length).toEqual(2);
  });
  // it('should format company informations into one', () => {
  //   company.add(newProviderInformations);
  //   const companyInformations = company.build();
  //   expect(Object.entries(companyInformations).length).toEqual(2);
  // });
});
