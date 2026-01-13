import { PricingCategory } from './pricing-category';
import { SeatingPlaceAvailability } from './seating-place-availability';

export class SeatingPlace {
  constructor(
    private readonly rowName: string,
    private readonly number: number,
    private readonly pricingCategory: PricingCategory,
    private seatingPlaceAvailability: SeatingPlaceAvailability
  ) {}

  public isAvailable(): boolean {
    return this.seatingPlaceAvailability === SeatingPlaceAvailability.Available;
  }

  public updateCategory(seatingPlaceAvailability: SeatingPlaceAvailability): void {
    this.seatingPlaceAvailability = seatingPlaceAvailability;
  }

  public toString(): string {
    return `${this.rowName}${this.number}`;
  }
}
