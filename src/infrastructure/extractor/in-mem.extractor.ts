import { ProviderCompanyInformation } from 'src/domain/interfaces/provider.interface';
import { Company } from '../../domain/company/company';
import { CompanyInformation } from '../../domain/company/company-informations/company-information';
import { InformationExtractor } from '../../domain/interfaces/extractor.interface';

import { InformationReferential } from '../../domain/referential';

export class InMemInformationExtractor extends InformationExtractor {
  constructor(private readonly referential: InformationReferential) {
    super();
  }
  storage = new Map<string, Company>();
  setCompanyInformation(company: Company) {
    const informations = this.storage.get(company.name);
    if (informations) {
      this.storage.set(company.name, company);
    }
    this.storage.set(company.name, company);
  }

  async extractCompanyInformations(
    companyName: string,
  ): Promise<CompanyInformation[]> {
    const company = this.storage.get(companyName);
    const companyInformations: CompanyInformation[] = [];
    const rawCompanyInformations: CompanyInformation[] = [];
    if (!company) {
      throw Error(`Company ${companyName} has no informations available`);
    }

    const providers = company.providerCompanyInformations;

    for (const [, value] of providers) {
      rawCompanyInformations.push(...value);
    }

    for (const information of rawCompanyInformations) {
      for (const rubric of this.referential.rubrics) {
        if (rubric.property === information.informationProperty) {
          companyInformations.push(information);
        }
      }
    }

    return companyInformations;
  }
}
