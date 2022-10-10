import {
  GOOGLE_SEARCH_SOCIETE_COM,
  GOOGLE_CONSENT,
  GOOGLE_FIRST_RESULT,
} from '../referential/constants/google.constant';
import { SOCIETE_COM_CONSENT } from '../referential/constants/societe-com.constant';
import {
  ElementNotFoundError,
  PuppeteerInformationCrawler,
} from './puppeteer.crawler';

export class SocieteComPuppeteerInformationCrawler extends PuppeteerInformationCrawler {
  constructor() {
    super();
  }

  async getElementValue(
    selector: string,
    htmlMarkupAttribute: string,
  ): Promise<string> {
    // TODO catch ?
    await this.page.waitForSelector(selector).catch((e) => {
      console.log('e', e);
    });
    const element = await this.page.$(selector);
    if (element === null) {
      throw new ElementNotFoundError(
        `Element ${selector} was not found for ${this.page.url}`,
      );
    }
    const value = (await (
      await element.getProperty(htmlMarkupAttribute)
    ).jsonValue()) as string;
    return value;
  }
  async reachInformationScenario(companyName: string) {
    await this.initBrowser();
    await this.goto(GOOGLE_SEARCH_SOCIETE_COM + companyName);
    await this.consentCookies(GOOGLE_CONSENT);
    await this.gotoFirstResult(GOOGLE_FIRST_RESULT);
    await this.consentCookies(SOCIETE_COM_CONSENT);
  }
}
