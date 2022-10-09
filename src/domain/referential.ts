export type InformationRubricDefinition = {
  htmlMarkupAttribute: string;
  selector: string;
  property: string;
  regexExtractor?: RegExp;
};

export type InformationReferentialDefinition = InformationRubricDefinition[];

export class InformationReferential {
  constructor(private readonly referentialRubrics: InformationReferentialDefinition) {}
  get rubrics() {
    return this.referentialRubrics;
  }
}
