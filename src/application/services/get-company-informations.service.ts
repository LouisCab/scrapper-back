import { Injectable } from '@nestjs/common';
import { Company, CompanyInformations } from 'src/domain/company/company';
import { InformationProvider } from 'src/domain/interfaces/provider.interface';

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
  async getInformationsForCompany(
    companyName: string,
  ): Promise<CompanyInformations> {
    const company = new Company(companyName, []);

    for (const provider of this.providers) {
      const elements = await provider.getCompanyInformations(companyName);
      company.add(elements);
    }

    if (company.companyInformations.length === 0) {
      throw new NoCompanyInformationExtracted(companyName);
    }
    return company.build();
  }
}
