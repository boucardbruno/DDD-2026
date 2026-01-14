import { PricingCategory } from './enums';
import { SeatingPlace } from './seatingPlace';

export class SeatingOptionIsSuggested {
  private readonly _seats: SeatingPlace[] = [];

  constructor(
    private readonly _partyRequested: number,
    private readonly _pricingCategory: PricingCategory
  ) {}

  public addSeat(seat: SeatingPlace): void {
    this._seats.push(seat);
  }

  public matchExpectation(): boolean {
    return this._seats.length === this._partyRequested;
  }

  public seats(): SeatingPlace[] {
    return this._seats;
  }

  public pricingCategory(): PricingCategory {
    return this._pricingCategory;
  }

  public partyRequested(): number {
    return this._partyRequested;
  }
}

export class SeatingOptionIsNotAvailable extends SeatingOptionIsSuggested {
  constructor(partyRequested: number, pricingCategory: PricingCategory) {
    super(partyRequested, pricingCategory);
  }
}
