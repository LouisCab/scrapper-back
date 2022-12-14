import * as puppeteer from 'puppeteer';
import {
  GOOGLE_CONSENT,
  GOOGLE_FIRST_RESULT,
  GOOGLE_SEARCH_LINKEDIN,
} from '../referential/constants/google.constant';
import {
  LINKEDIN_IDENTIFY_BUTTON,
  LINKEDIN_AUTHENTICATION_BUTTON,
  LINKEDIN_AUTHWALL,
  LINKEDIN_ABOUT_US_BUTTON,
  LINKEDIN_USERNAME_INPUT,
  LINKEDIN_PASSWORD_INPUT,
} from '../referential/constants/linkedin.constant';
import {
  ElementNotFoundError,
  PuppeteerInformationCrawler,
} from './puppeteer.crawler';

export class LinkedinPuppeteerInformationCrawler extends PuppeteerInformationCrawler {
  constructor() {
    super();
  }

  random() {
    return Math.floor(Math.random() * (5000 - 1000 + 1) + 1000);
  }

  async delay() {
    return new Promise(function (resolve) {
      setTimeout(resolve, Math.floor(Math.random() * (5000 - 1000 + 1) + 1000));
    });
  }
  async authenticate() {
    await this.page.click(LINKEDIN_IDENTIFY_BUTTON);

    this.delay();
    await this.page.type(LINKEDIN_USERNAME_INPUT, process.env.LINKEDIN_LOGIN);
    await this.page.type(
      LINKEDIN_PASSWORD_INPUT,
      process.env.LINKEDIN_PASSWORD,
    );
    this.delay();
    await this.page.waitForSelector(LINKEDIN_AUTHENTICATION_BUTTON);
    await this.page.click(LINKEDIN_AUTHENTICATION_BUTTON);
    await this.page.setCookie(this.page.cookies()[0]);
  }
  async reachInformationScenario(companyName: string) {
    await this.initBrowser();
    // await this.goto(LINKEDIN_AUTHWALL);
    // await this.authenticate();
    // this.delay();

    await this.goto(GOOGLE_SEARCH_LINKEDIN + companyName);
    await this.consentCookies(GOOGLE_CONSENT);
    await this.gotoFirstResult(GOOGLE_FIRST_RESULT);
    await this.authenticate();
    // this.delay();

    // // await this.authenticate();
    // await this.page.waitForXPath(LINKEDIN_ABOUT_US_BUTTON);
    // const elem = (
    //   await this.page.$x(LINKEDIN_ABOUT_US_BUTTON)
    // )[0] as puppeteer.ElementHandle<HTMLElement>;
    // await elem.click();
  }

  async getElementValue(
    selector: string,
    htmlMarkupAttribute: string,
  ): Promise<string> {
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
