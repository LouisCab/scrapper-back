import { CompanyInformation } from '../../domain/company/company-informations/company-information';
import { InformationCrawler } from '../../domain/interfaces/crawler.interface';
import { InformationExtractor } from '../../domain/interfaces/extractor.interface';
import { InformationReferential } from '../../domain/referential';

export class SocieteComPuppeteerInformationExtractor extends InformationExtractor {
  constructor(
    private readonly referential: InformationReferential,
    private readonly crawler: InformationCrawler,
  ) {
    super();
  }
  async extractCompanyInformations(): Promise<CompanyInformation[]> {
    const companyInformations: CompanyInformation[] = [];
    for (const rubric of this.referential.rubrics) {
      const content = await this.crawler.getElementValue(
        rubric.selector,
        rubric.htmlMarkupAttribute,
      );

      if (!content) {
        return;
      }
      const companyInformation = new CompanyInformation(
        rubric.property,
        content,
      );
      if (rubric.regexExtractor) {
        companyInformation.refineContent(rubric.regexExtractor);
      }

      companyInformations.push(companyInformation);
    }

    await this.crawler.closeBrowser();

    return companyInformations;
  }
}
