import { PricingCategory } from './enums';
import { Row } from './row';
import { SeatingPlace } from './seatingPlace';
import { SeatingOptionIsSuggested, SeatingOptionIsNotAvailable } from './seatingOptionIsSuggested';

export class AuditoriumSeatingArrangement {
  constructor(private readonly rows: Map<string, Row>) {}

  public suggestSeatingOptionFor(
    partyRequested: number,
    pricingCategory: PricingCategory
  ): SeatingOptionIsSuggested {
    for (const row of this.rows.values()) {
      const seatingOptionSuggested = row.suggestSeatingOption(partyRequested, pricingCategory);

      if (seatingOptionSuggested.matchExpectation()) {
        return seatingOptionSuggested;
      }
    }

    return new SeatingOptionIsNotAvailable(partyRequested, pricingCategory);
  }

  public getRows(): Map<string, Row> {
    return this.rows;
  }

}
