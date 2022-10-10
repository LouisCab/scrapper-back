import { InformationReferential } from '../../domain/referential';

export const linkedinInformationReferential = new InformationReferential([
  {
    htmlMarkupAttribute: 'href',
    selector:
      '#main-content > section > div > section > div > dl > div:nth-child(1) > dd > a',
    property: 'website',
  },
  {
    htmlMarkupAttribute: 'innerText',
    selector:
      '#main-content > section > div > section> div > dl > div:nth-child(2) > dd',
    property: 'activitySector',
  },

  {
    htmlMarkupAttribute: 'innerText',
    selector:
      '#main-content > section > div > section> div > dl > div:nth-child(3) > dd',
    property: 'companySize',
  },

  {
    htmlMarkupAttribute: 'innerText',
    selector:
      '#main-content > section > div > section> div > dl > div:nth-child(4) > dd',
    property: 'headOfficeLocation',
  },

  {
    htmlMarkupAttribute: 'innerText',
    selector:
      '#main-content > section > section > div > div > div > ul > li > div > a',
    property: 'employeeOnLinkedin',
  },

  {
    htmlMarkupAttribute: 'src',
    selector: '#main-content > section > section > div > div > img',
    property: 'logo',
  },
]);
