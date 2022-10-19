import { FactoryProvider, Module } from '@nestjs/common';
import { GetCompanyInformationsController } from 'src/infrastructure/controller/get-company-informations.controller';
import { GetCompanyInformationsService } from './application/services/get-company-informations.service';
import { LinkedinPuppeteerInformationCrawler } from './infrastructure/crawler/linkedin.puppeteer.crawler';
import { SocieteComPuppeteerInformationCrawler } from './infrastructure/crawler/societe-com.puppeteer.crawler';
import { LinkedinPuppeteerInformationExtractor } from './infrastructure/extractor/linkedin.puppeteer.extractor';
import { SocieteComPuppeteerInformationExtractor } from './infrastructure/extractor/societe-com.puppeteer.extractor';
import { LinkedinInformationProvider } from './infrastructure/provider/linkedin.provider';
import { SocieteComInformationProvider } from './infrastructure/provider/societe-com.provider';
import { linkedinInformationReferential } from './infrastructure/referential/linkedin.referential';
import { societeComInformationReferential } from './infrastructure/referential/societe-com.referential';

const crawlers = [
  {
    provide: LinkedinPuppeteerInformationCrawler,
    useClass: LinkedinPuppeteerInformationCrawler,
  },
  {
    provide: SocieteComPuppeteerInformationCrawler,
    useClass: SocieteComPuppeteerInformationCrawler,
  },
];

// const linkedinProvider = {
//   provide: LinkedinInformationProvider,
//   inject: [LinkedinPuppeteerInformationCrawler],
//   useFactory: (crawler: LinkedinPuppeteerInformationCrawler) => {
//     return new LinkedinInformationProvider(
//       new LinkedinPuppeteerInformationExtractor(
//         linkedinInformationReferential,
//         crawler,
//       ),
//       crawler,
//     );
//   },
// };

const societeComProvider = {
  provide: SocieteComInformationProvider,
  inject: [SocieteComPuppeteerInformationCrawler],
  useFactory: (crawler: SocieteComPuppeteerInformationCrawler) => {
    return new SocieteComInformationProvider(
      new SocieteComPuppeteerInformationExtractor(
        societeComInformationReferential,
        crawler,
      ),
      crawler,
    );
  },
};

const getCompanyInformationsService: FactoryProvider = {
  provide: GetCompanyInformationsService,
  inject: [SocieteComInformationProvider], //LinkedinInformationProvider,
  useFactory: (
    // linkedin: LinkedinInformationProvider,
    societeCom: SocieteComInformationProvider,
  ) => {
    return new GetCompanyInformationsService([societeCom]); //linkedin,
  },
};

@Module({
  imports: [],
  controllers: [GetCompanyInformationsController],
  providers: [
    ...crawlers,
    // linkedinProvider,
    societeComProvider,
    getCompanyInformationsService,
  ],
})
export class AppModule {}
