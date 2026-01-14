import { PricingCategory } from './enums';
import { SuggestionIsMade } from './suggestionIsMade';

export class SuggestionsAreMade {
  private readonly forCategory: Map<PricingCategory, SuggestionIsMade[]> = new Map();

  constructor(
    private readonly _showId: string,
    private readonly _partyRequested: number
  ) {
    this.instantiateAnEmptyListForEveryPricingCategory();
  }

  public seatNames(pricingCategory: PricingCategory): string[] {
    const suggestions = this.forCategory.get(pricingCategory) || [];
    return suggestions.flatMap((suggestion) => suggestion.seatNames());
  }

  private instantiateAnEmptyListForEveryPricingCategory(): void {
    // PricingCategory est un enum numérique 1, 2, 3, 4
    for (const category of [
      PricingCategory.First,
      PricingCategory.Second,
      PricingCategory.Third,
      PricingCategory.Ignored,
    ]) {
      this.forCategory.set(category, []);
    }
  }

  public add(suggestions: SuggestionIsMade[]): void {
    suggestions.forEach((suggestion) => {
      const list = this.forCategory.get(suggestion.pricingCategory());
      if (list) {
        list.push(suggestion);
      }
    });
  }

  public matchExpectations(): boolean {
    return Array.from(this.forCategory.values())
      .flat()
      .some((suggestion) => suggestion.matchExpectation());
  }

  public showId(): string {
    return this._showId;
  }

  public partyRequested(): number {
    return this._partyRequested;
  }
}

export class SuggestionsAreAreNotAvailable extends SuggestionsAreMade {
  constructor(showId: string, partyRequested: number) {
    super(showId, partyRequested);
  }
}
