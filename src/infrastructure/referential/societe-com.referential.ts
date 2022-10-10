import { InformationReferential } from '../../domain/referential';

export const societeComInformationReferential = new InformationReferential([
  {
    htmlMarkupAttribute: 'innerText',
    selector:
      '#rensjur > tbody > tr:nth-child(1) > td.flex.space-between.flex-wrap',
    property: 'creationDate',
    regexExtractor: /([\d|-]+)/,
  },
  {
    htmlMarkupAttribute: 'innerText',
    selector: '#rensjur > tbody > tr:nth-child(3) > td.break-word',
    property: 'commercialName',
  },
  {
    htmlMarkupAttribute: 'innerText',
    selector: '#rensjur > tbody > tr:nth-child(5) > td:nth-child(2)',
    property: 'address',
  },
  {
    htmlMarkupAttribute: 'innerText',
    selector: '#siren_number > span',
    property: 'sirenNumber',
  },
  {
    htmlMarkupAttribute: 'innerText',
    selector: '#siret_number > span',
    property: 'siretNumber',
  },
  {
    htmlMarkupAttribute: 'innerText',
    selector: '#tva_number > span',
    property: 'tvaCode',
  },
  {
    htmlMarkupAttribute: 'innerText',
    selector: '#rensjur > tbody > tr:nth-child(10) > td.numdisplay',
    property: 'rcsCode',
  },
  {
    htmlMarkupAttribute: 'innerText',
    selector: '#rensjur > tbody > tr:nth-child(12) > td:nth-child(2)',
    property: 'category',
  },
  {
    htmlMarkupAttribute: 'innerText',
    selector:
      '#rensjur > tbody > tr:nth-child(15) > td.flex.space-between.flex-wrap > div > span.TableTextGenerique > span',
    property: 'rcsStatus',
  },
  {
    htmlMarkupAttribute: 'innerText',
    selector:
      '#rensjur > tbody > tr:nth-child(16) > td.flex.space-between.flex-wrap > div > span',
    property: 'inseeStatus',
  },
  {
    htmlMarkupAttribute: 'innerText',
    selector: '#rensjur > tbody > tr:nth-child(17) > td:nth-child(2)',
    property: 'rcsImmatriculationDate',
  },
  {
    htmlMarkupAttribute: 'innerText',
    selector: '#rensjur > tbody > tr:nth-child(18) > td:nth-child(2)',
    property: 'inseeRegistrationDate',
  },
]);
