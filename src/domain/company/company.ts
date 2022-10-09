import { CompanyInformation } from './company-informations/company-information';
export type CompanyInformations = { [key: string]: string };
export class Company {
  constructor(public readonly name: string, private informations: CompanyInformation[]) {}

  get companyInformations() {
    return this.informations;
  }
  add(companyInformation: CompanyInformation[]) {
    this.informations = [...this.informations, ...companyInformation];
  }

  build(): CompanyInformations {
    let companyInformations: CompanyInformations = {};
    const elements = this.informations.map((information) => {
      return information.build();
    });
    for (const element of elements) {
      companyInformations = { ...companyInformations, ...element };
    }
    return { ...companyInformations };
  }
}
