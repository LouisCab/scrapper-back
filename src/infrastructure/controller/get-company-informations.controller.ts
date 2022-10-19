import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { GetCompanyInformationsService } from 'src/application/services/get-company-informations.service';
import { Company } from 'src/domain/company/company';

type GetCompanyInformationsParam = { companyName: string };

@Controller('company')
@UseInterceptors(ClassSerializerInterceptor)
export class GetCompanyInformationsController {
  constructor(private readonly scrapService: GetCompanyInformationsService) {}

  @Get('/getCompanyInformations/:companyName')
  async getCompanyInformations(
    @Param() req: GetCompanyInformationsParam,
  ): Promise<Company> {
    const company = await this.scrapService.getInformationsForCompany(
      req.companyName,
    );

    return company;
  }
}
