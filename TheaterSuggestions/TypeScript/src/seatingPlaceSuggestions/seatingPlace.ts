import { PricingCategory, SeatingPlaceAvailability } from './enums';

export class SeatingPlace {
  constructor(
    private  rowName: string,
    private  number: number,
    private  pricingCategory: PricingCategory,
    private  seatingPlaceAvailability: SeatingPlaceAvailability
  ) {}

  public isAvailable(): boolean {
    return this.seatingPlaceAvailability === SeatingPlaceAvailability.Available;
  }

  public matchCategory(pricingCategory: PricingCategory): boolean {
    if (pricingCategory === PricingCategory.Ignored) {
      return true;
    }
    return this.pricingCategory === pricingCategory;
  }

  public allocate() {
    if (this.seatingPlaceAvailability === SeatingPlaceAvailability.Available) {
        this.seatingPlaceAvailability = SeatingPlaceAvailability.Allocated;
    }
  }

  public toString(): string {
    return `${this.rowName}${this.number}`;
  }
}
