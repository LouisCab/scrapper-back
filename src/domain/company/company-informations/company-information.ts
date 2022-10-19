export class CompanyInformation {
  constructor(private readonly property: string, private content: string) {}

  get informationContent() {
    return this.content;
  }

  get informationProperty() {
    return this.property;
  }
  setContent(content: string) {
    this.content = content;
  }

  refineContent(regex: RegExp) {
    const extracted = this.content.match(regex);
    if (extracted === null) {
      throw new Error(
        `Cannot refine "${this.content}" for ${this.property} with ${regex}`,
      );
    }
    this.content = extracted[0].trim();
  }
}
