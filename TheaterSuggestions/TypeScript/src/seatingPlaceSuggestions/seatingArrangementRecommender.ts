import { AuditoriumSeatingArrangements } from './auditoriumSeatingArrangements';
import { PricingCategory } from './enums';
import { SuggestionIsMade } from './suggestionIsMade';
import { SuggestionsAreMade, SuggestionsAreAreNotAvailable } from './suggestionsAreMade';
import { AuditoriumSeatingArrangement } from './auditoriumSeatingArrangement';

export class SeatingArrangementRecommender {
  private static readonly NUMBER_OF_SUGGESTIONS = 3;

  constructor(private readonly auditoriumSeatingArrangements: AuditoriumSeatingArrangements) {}

  public makeSuggestion(showId: string, partyRequested: number): SuggestionsAreMade {
    const auditoriumSeating = this.auditoriumSeatingArrangements.findByShowId(showId);

    const suggestionsMade = new SuggestionsAreMade(showId, partyRequested);

    suggestionsMade.add(
      this.giveMeSuggestionsFor(auditoriumSeating, partyRequested, PricingCategory.First)
    );
    suggestionsMade.add(
      this.giveMeSuggestionsFor(auditoriumSeating, partyRequested, PricingCategory.Second)
    );
    suggestionsMade.add(
      this.giveMeSuggestionsFor(auditoriumSeating, partyRequested, PricingCategory.Third)
    );

    if (suggestionsMade.matchExpectations()) {
      return suggestionsMade;
    }

    return new SuggestionsAreAreNotAvailable(showId, partyRequested);
  }

  private giveMeSuggestionsFor(
    auditoriumSeatingArrangement: AuditoriumSeatingArrangement,
    partyRequested: number,
    pricingCategory: PricingCategory
  ): SuggestionIsMade[] {
    const foundedSuggestions: SuggestionIsMade[] = [];

    for (let i = 0; i < SeatingArrangementRecommender.NUMBER_OF_SUGGESTIONS; i++) {
      const seatingOptionSuggested = auditoriumSeatingArrangement.suggestSeatingOptionFor(
        partyRequested,
        pricingCategory
      );

      if (seatingOptionSuggested.matchExpectation()) {
        for (const seatingPlace of seatingOptionSuggested.seats()) {
          auditoriumSeatingArrangement = auditoriumSeatingArrangement.allocate(seatingPlace);
        }

        foundedSuggestions.push(new SuggestionIsMade(seatingOptionSuggested));
      }
    }

    return foundedSuggestions;
  }
}
