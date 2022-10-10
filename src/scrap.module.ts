import { Module } from '@nestjs/common';
import { GetCompanyInformationsController } from 'src/infrastructure/controller/get-company-informations.controller';

@Module({
  imports: [],
  controllers: [GetCompanyInformationsController],
  providers: [],
})
export class AppModule {}
