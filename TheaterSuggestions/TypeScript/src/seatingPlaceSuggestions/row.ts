import { PricingCategory } from './enums';
import { SeatingPlace } from './seatingPlace';
import { SeatingOptionIsSuggested, SeatingOptionIsNotAvailable } from './seatingOptionIsSuggested';

export class Row {
  constructor(
    private readonly name: string,
    private readonly seatingPlaces: SeatingPlace[]
  ) {}

  public getName(): string {
    return this.name;
  }

  public getSeatingPlaces(): SeatingPlace[] {
    return this.seatingPlaces;
  }

  public suggestSeatingOption(
    partyRequested: number,
    pricingCategory: PricingCategory
  ): SeatingOptionIsSuggested {
    const seatAllocation = new SeatingOptionIsSuggested(partyRequested, pricingCategory);

    for (const seat of this.seatingPlaces) {
      if (seat.isAvailable() && seat.matchCategory(pricingCategory)) {
        seatAllocation.addSeat(seat);

        if (seatAllocation.matchExpectation()) {
          return seatAllocation;
        }
      }
    }

    return new SeatingOptionIsNotAvailable(partyRequested, pricingCategory);
  }
}
