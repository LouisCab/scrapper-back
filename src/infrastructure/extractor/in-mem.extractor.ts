import { Company } from '../../domain/company/company';
import { CompanyInformation } from '../../domain/company/company-informations/company-information';
import { InformationExtractor } from '../../domain/interfaces/extractor.interface';

import { InformationReferential } from '../../domain/referential';

export class InMemInformationExtractor extends InformationExtractor {
  constructor(private readonly referential: InformationReferential) {
    super();
  }
  storage = new Map<string, CompanyInformation[]>();
  setCompanyInformation(company: Company) {
    const informations = this.storage.get(company.name);
    if (informations) {
      this.storage.set(company.name, [...company.companyInformations, ...informations]);
    }
    this.storage.set(company.name, company.companyInformations);
  }

  async extractCompanyInformations(companyName: string): Promise<CompanyInformation[]> {
    const gatheredElement = this.storage.get(companyName);
    const companyInformations: CompanyInformation[] = [];

    if (!gatheredElement) {
      throw Error(`Company ${companyName} has no informations available`);
    }

    for (const rubric of this.referential.rubrics) {
      for (const information of gatheredElement)
        if (rubric.property === information.informationProperty) {
          if (rubric.regexExtractor) {
            information.refineContent(rubric.regexExtractor);
          }
          companyInformations.push(information);
        }
    }

    return companyInformations;
  }
}
