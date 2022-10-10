import * as puppeteer from 'puppeteer';
import {
  GOOGLE_CONSENT,
  GOOGLE_FIRST_RESULT,
  GOOGLE_SEARCH_LINKEDIN,
} from '../referential/constants/google.constant';
import {
  LINKEDIN_IDENTIFY_BUTTON,
  LINKEDIN_USERNAME,
  LINKEDIN_PASSWORD,
  LINKEDIN_AUTHENTICATION_BUTTON,
  LINKEDIN_AUTHWALL,
  LINKEDIN_ABOUT_US_BUTTON,
} from '../referential/constants/linkedin.constant';
import {
  ElementNotFoundError,
  PuppeteerInformationCrawler,
} from './puppeteer.crawler';

export class LinkedinPuppeteerInformationCrawler extends PuppeteerInformationCrawler {
  constructor() {
    super();
  }
  async authenticate() {
    await this.page.click(LINKEDIN_IDENTIFY_BUTTON);
    await this.page.type(LINKEDIN_USERNAME, 'louiscabirol@yahoo.fr');
    await this.page.type(LINKEDIN_PASSWORD, 'dLHSGn8SX!!4mM9P');
    await this.page.click(LINKEDIN_AUTHENTICATION_BUTTON);
    await this.page.waitForNavigation();
    await this.page.setCookie();
  }
  async reachInformationScenario(companyName: string) {
    await this.initBrowser();
    await this.goto(LINKEDIN_AUTHWALL);
    await this.authenticate();
    await this.goto(GOOGLE_SEARCH_LINKEDIN + companyName);
    await this.consentCookies(GOOGLE_CONSENT);
    await this.gotoFirstResult(GOOGLE_FIRST_RESULT);
    await this.page.waitForXPath(LINKEDIN_ABOUT_US_BUTTON);
    const elem = (
      await this.page.$x(LINKEDIN_ABOUT_US_BUTTON)
    )[0] as puppeteer.ElementHandle<HTMLElement>;
    await elem.click();
  }

  async getElementValue(
    selector: string,
    htmlMarkupAttribute: string,
  ): Promise<string> {
    // TODO catch ?
    await this.page.waitForXPath(selector).catch((e) => {
      console.log('e', e);
    });

    const elementHandle = await this.page.$$('xpath' + selector);

    if (elementHandle.length === 0) {
      throw new ElementNotFoundError(
        `Element ${selector} was not found for ${this.page.url}`,
      );
    }

    const value = (await (
      await elementHandle[0].getProperty(htmlMarkupAttribute)
    ).jsonValue()) as string;

    return value;
  }
}
