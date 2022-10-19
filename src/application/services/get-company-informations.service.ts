import { Injectable } from '@nestjs/common';
import { Company } from 'src/domain/company/company';
import {
  InformationProvider,
  ProviderCompanyInformation,
} from 'src/domain/interfaces/provider.interface';

class ApplicativeError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class NoCompanyInformationExtracted extends ApplicativeError {
  constructor(companyName: string) {
    super(`Could not retrieve information for ${companyName}. `);
  }
}

@Injectable()
export class GetCompanyInformationsService {
  constructor(private readonly providers: InformationProvider[]) {}
  async getInformationsForCompany(companyName: string): Promise<Company> {
    const providerCompanyInformations: ProviderCompanyInformation = new Map();
    const company = new Company(companyName, providerCompanyInformations);

    for (const provider of this.providers) {
      const elements = await provider.getCompanyInformations(companyName);
      company.add(elements);
    }

    if (company.providerCompanyInformations.size === 0) {
      throw new NoCompanyInformationExtracted(companyName);
    }
    console.log('company from service : ', company);
    return company;
  }
}
