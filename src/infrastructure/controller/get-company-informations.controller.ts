import { Controller, Get, Query } from '@nestjs/common';
import { GetCompanyInformationsService } from 'src/application/services/get-company-informations.service';
import { CompanyInformations } from 'src/domain/company/company';

@Controller('company')
export class GetCompanyInformationsController {
  constructor(private readonly scrapService: GetCompanyInformationsService) {}

  @Get('/getCompanyInformations')
  async getCompanyInformations(
    @Query() req: any,
  ): Promise<CompanyInformations> {
    return await this.scrapService.getInformationsForCompany(req.companyName);
  }
}
