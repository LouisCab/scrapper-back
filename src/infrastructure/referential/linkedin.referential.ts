import { InformationReferential } from '../../domain/referential';

export const linkedinInformationReferential = new InformationReferential([
  {
    htmlMarkupAttribute: 'innerText',
    selector:
      '/html/body/div[6]/div[3]/div/div[2]/div/div[2]/main/div[2]/div/div/div[1]/section/dl/dd[1]/a/span',
    property: 'website',
  },
  {
    htmlMarkupAttribute: 'innerText',
    selector:
      '/html/body/div[6]/div[3]/div/div[2]/div/div[2]/main/div[2]/div/div/div[1]/section/dl/dd[3]',
    property: 'activitySector',
  },
  {
    htmlMarkupAttribute: 'innerText',
    selector:
      '/html/body/div[6]/div[3]/div/div[2]/div/div[2]/main/div[2]/div/div/div[1]/section/dl/dd[4]',
    property: 'companySize',
  },

  {
    htmlMarkupAttribute: 'innerText',
    selector:
      '/html/body/div[6]/div[3]/div/div[2]/div/div[2]/main/div[2]/div/div/div[1]/section/dl/dd[6]',
    property: 'headOfficeLocation',
  },

  {
    htmlMarkupAttribute: 'innerText',
    selector:
      '/html/body/div[6]/div[3]/div/div[2]/div/div[2]/main/div[2]/div/div/div[1]/section/dl/dd[5]',
    property: 'employeeOnLinkedin',
    regexExtractor: /([\w|\s?]+(?=\n|\\n))/,
  },

  {
    htmlMarkupAttribute: 'src',
    selector:
      '/html/body/div[6]/div[3]/div/div[2]/div/div[2]/main/div[1]/section/div/div[2]/div[1]/div[1]/div[1]/img',
    property: 'logo',
  },
]);
