import { InformationExtractor } from 'src/domain/interfaces/extractor.interface';
import { InformationProvider } from 'src/domain/interfaces/provider.interface';
import { InformationReferential } from 'src/domain/referential';
import { InMemInformationExtractor } from 'src/infrastructure/extractor/in-mem.extractor';
import { FakeInformationProvider } from 'src/infrastructure/provider/fake.provider';
import { GetCompanyInformationsService } from './get-company-informations.service';

describe('e2e test', () => {
  let referential: InformationReferential;
  let informationProvider: InformationProvider;
  let extractor: InformationExtractor;
  let service: GetCompanyInformationsService;

  beforeEach(() => {
    referential = new InformationReferential([
      { property: 'property1', selector: '', htmlMarkupAttribute: '' },
      { property: 'property2', selector: '', htmlMarkupAttribute: '' },
    ]);
    extractor = new InMemInformationExtractor(referential);
    informationProvider = new FakeInformationProvider(extractor);

    service = new GetCompanyInformationsService([informationProvider]);
  });
  it('should return company for given name"', async () => {
    const req = '365Talents';
    const company = await service.getInformationsForCompany(req);
    expect(company).toBeDefined();
  });
});
