describe('company /getCompanyInformations', () => {
  jest.setTimeout(60000);
  // let app: TestingModule;
  // let controller: GetCompanyInformationsController;

  // const crawlers = [
  //   {
  //     provide: PuppeteerInformationCrawler,
  //     useClass: PuppeteerInformationCrawler,
  //   },
  // ];

  // const refineries = [
  //   {
  //     provide: PuppeteerInformationRefinery,
  //     useClass: PuppeteerInformationRefinery,
  //   },
  // ];

  // const extractorLinkedin = {
  //   provide: PuppeteerInformationExtractor,
  //   inject: [PuppeteerInformationCrawler],
  //   useFactory: (crawler: PuppeteerInformationCrawler) => {
  //     return new PuppeteerInformationExtractor(crawler);
  //   },
  // };

  // const extractorSocieteCom = {
  //   provide: PuppeteerInformationExtractor,
  //   inject: [PuppeteerInformationCrawler],
  //   useFactory: (crawler: PuppeteerInformationCrawler) => {
  //     return new PuppeteerInformationExtractor(crawler);
  //   },
  // };
  // const linkedinProvider = {
  //   provide: LinkedinProvider,
  //   inject: [
  //     PuppeteerInformationExtractor,
  //     PuppeteerInformationRefinery,
  //     PuppeteerInformationCrawler,
  //   ],
  //   useFactory: (
  //     _extractor: PuppeteerInformationExtractor,
  //     refinery: PuppeteerInformationRefinery,
  //     crawler: PuppeteerInformationCrawler,
  //   ) => {
  //     return new LinkedinProvider(
  //       new PuppeteerInformationExtractor(crawler),
  //       refinery,
  //       crawler,
  //     );
  //   },
  // };

  // const societeComProvider = {
  //   provide: SocieteComProvider,
  //   inject: [
  //     PuppeteerInformationExtractor,
  //     PuppeteerInformationRefinery,
  //     PuppeteerInformationCrawler,
  //   ],
  //   useFactory: (
  //     _extractor: PuppeteerInformationExtractor,
  //     refinery: PuppeteerInformationRefinery,
  //     crawler: PuppeteerInformationCrawler,
  //   ) => {
  //     return new SocieteComProvider(
  //       new PuppeteerInformationExtractor(crawler),
  //       refinery,
  //       crawler,
  //     );
  //   },
  // };

  // const getCompanyInformationsService: FactoryProvider = {
  //   provide: GetCompanyInformationsService,
  //   inject: [LinkedinProvider, SocieteComProvider],
  //   useFactory: (
  //     linkedin: LinkedinProvider,
  //     societeCom: SocieteComProvider,
  //   ) => {
  //     return new GetCompanyInformationsService([linkedin, societeCom]);
  //   },
  // };

  // beforeEach(async () => {
  //   app = await Test.createTestingModule({
  //     controllers: [GetCompanyInformationsController],
  //     providers: [
  //       ...crawlers,
  //       ...refineries,
  //       extractorLinkedin,
  //       extractorSocieteCom,
  //       linkedinProvider,
  //       societeComProvider,
  //       getCompanyInformationsService,
  //     ],
  //   }).compile();

  //   controller = app.get<GetCompanyInformationsController>(
  //     GetCompanyInformationsController,
  //   );
  // });

  afterAll(async () => {
    await app.close();
  });

  describe('e2e test', () => {
    it('should return company for given name"', async () => {
      const req = { companyName: 'gojob' };
      const company = await controller.getCompanyInformations(req);
      expect(company).toBeDefined();
    });
  });
});
