export type InformationRubricDefinition = {
  property: string;
};

export interface InformationRubricValue extends InformationRubricDefinition {
  rawValue: string;
}

export type InformationRubricValueDefinition = InformationRubricValue[];

export type InformationReferentialDefinition = InformationRubricDefinition[];

export class InformationReferential {
  constructor(private readonly referentialRubrics: InformationReferentialDefinition) {}
  get rubrics() {
    return this.referentialRubrics;
  }
}
