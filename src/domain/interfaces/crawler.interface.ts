export interface InformationCrawler {
  initBrowser();
  closeBrowser();
  goto(url: string);
  consentCookies(selector: string);
  gotoFirstResult(selector: string);
  getElementValue?(selector: string, htmlAttribute: string): Promise<string>;
  reachInformationScenario?(companyName: string);
  authenticate?();
}
