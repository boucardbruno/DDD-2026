import { PricingCategory } from './enums';
import { SeatingPlace } from './seatingPlace';
import { SeatingOptionIsSuggested } from './seatingOptionIsSuggested';

export class SuggestionIsMade {
  private readonly suggestedSeats: SeatingPlace[];
  private readonly _partyRequested: number;
  private readonly _pricingCategory: PricingCategory;

  constructor(seatingOptionIsSuggested: SeatingOptionIsSuggested) {
    this.suggestedSeats = seatingOptionIsSuggested.seats();
    this._partyRequested = seatingOptionIsSuggested.partyRequested();
    this._pricingCategory = seatingOptionIsSuggested.pricingCategory();
  }

  public seatNames(): string[] {
    return this.suggestedSeats.map((seat) => seat.toString());
  }

  public matchExpectation(): boolean {
    return this.suggestedSeats.length === this._partyRequested;
  }

  public pricingCategory(): PricingCategory {
    return this._pricingCategory;
  }
}
