import { InformationReferential } from '../../domain/referential';

// export const linkedinInformationReferential = new InformationReferential([
//   {
//     htmlMarkupAttribute: 'innerText',
//     selector:
//       '#main-content > section > div > section > div > dl > div:nth-child(1) > dd > a',
//     // '/html/body/div[6]/div[3]/div/div[2]/div/div[2]/main/div[2]/div/div/div[1]/section/dl/dd[1]/a/span',
//     property: 'website',
//   },
//   // #main-content > section.core-rail.mx-auto.papabear\:w-core-rail-width.mamabear\:max-w-\[790px\].babybear\:max-w-\[790px\] > div > section.core-section-container.my-3.core-section-container--with-border.border-b-1.border-solid.border-color-border-faint.m-0.py-3.text-color-text > div > dl > div:nth-child(1) > dd > a
//   {
//     htmlMarkupAttribute: 'innerText',
//     selector:
//       '#main-content > section > div > section> div > dl > div:nth-child(2) > dd',
//     // '/html/body/div[6]/div[3]/div/div[2]/div/div[2]/main/div[2]/div/div/div[1]/section/dl/dd[3]',
//     property: 'activitySector',
//   },
//   {
//     htmlMarkupAttribute: 'innerText',
//     selector:
//       '#main-content > section > div > section> div > dl > div:nth-child(3) > dd',
//     // '/html/body/div[6]/div[3]/div/div[2]/div/div[2]/main/div[2]/div/div/div[1]/section/dl/dd[4]',
//     property: 'companySize',
//   },

//   {
//     htmlMarkupAttribute: 'innerText',
//     selector:
//       '#main-content > section > div > section> div > dl > div:nth-child(4) > dd',
//     // '/html/body/div[6]/div[3]/div/div[2]/div/div[2]/main/div[2]/div/div/div[1]/section/dl/dd[6]',
//     property: 'headOfficeLocation',
//   },

//   {
//     htmlMarkupAttribute: 'innerText',
//     selector:
//       '#main-content > section > section > div > div > div > ul > li > div > a',
//     // '/html/body/div[6]/div[3]/div/div[2]/div/div[2]/main/div[2]/div/div/div[1]/section/dl/dd[5]',
//     property: 'employeeOnLinkedin',
//     regexExtractor: /([\w|\s?]+(?=\n|\\n))/,
//   },

//   {
//     htmlMarkupAttribute: 'src',
//     selector: '#main-content > section > section > div > div > img',
//     // '/html/body/div[6]/div[3]/div/div[2]/div/div[2]/main/div[1]/section/div/div[2]/div[1]/div[1]/div[1]/img',
//     property: 'logo',
//   },
// ]);
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
