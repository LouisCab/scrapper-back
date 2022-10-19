import { ProviderCompanyInformation } from '../interfaces/provider.interface';

export class Company {
  constructor(
    public readonly name: string,
    private informations: ProviderCompanyInformation,
  ) {}

  get providerCompanyInformations() {
    return this.informations;
  }

  add(providerInformations: ProviderCompanyInformation) {
    for (const [
      provider,
      companyInformations,
    ] of providerInformations.entries()) {
      if (this.informations.has(provider)) {
        const existingCompanyInformations = this.informations.get(provider);
        this.informations.set(provider, [
          ...companyInformations,
          ...existingCompanyInformations,
        ]);
      } else {
        this.informations.set(provider, companyInformations);
      }
    }
  }
}
