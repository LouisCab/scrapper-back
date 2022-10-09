export class CompanyInformation {
  constructor(public readonly property: string, public readonly content: string) {}

  build() {
    return { [this.property]: this.content };
  }
}
