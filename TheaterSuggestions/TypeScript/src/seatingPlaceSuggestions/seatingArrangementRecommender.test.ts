import { AuditoriumLayoutRepository } from '../../src/externalDependencies/auditoriumLayoutRepository';
import { ReservationsProvider } from '../../src/externalDependencies/reservationsProvider';
import { AuditoriumSeatingArrangements } from '../../src/seatingPlaceSuggestions/auditoriumSeatingArrangements';
import { SeatingArrangementRecommender } from '../../src/seatingPlaceSuggestions/seatingArrangementRecommender';
import { PricingCategory } from '../../src/seatingPlaceSuggestions/enums';
import { SuggestionsAreAreNotAvailable } from '../../src/seatingPlaceSuggestions/suggestionsAreMade';

describe('SeatingArrangementRecommender', () => {
  test('suggest_one_seatingPlace_when_Auditorium_contains_one_available_seatingPlace', () => {
    const showId = '1';
    const partyRequested = 1;

    const auditoriumSeatingArrangements = new AuditoriumSeatingArrangements(
      new AuditoriumLayoutRepository(),
      new ReservationsProvider()
    );
    const seatingArrangementRecommender = new SeatingArrangementRecommender(
      auditoriumSeatingArrangements
    );
    const suggestionsAreMade = seatingArrangementRecommender.makeSuggestion(showId, partyRequested);

    expect(suggestionsAreMade.seatNames(PricingCategory.First)).toEqual(['A3']);
  });

  test('return_SuggestionNotAvailable_when_Auditorium_has_all_its_seatingPlaces_reserved', () => {
    const showId = '5';
    const partyRequested = 1;

    const auditoriumSeatingArrangements = new AuditoriumSeatingArrangements(
      new AuditoriumLayoutRepository(),
      new ReservationsProvider()
    );
    const seatingArrangementRecommender = new SeatingArrangementRecommender(
      auditoriumSeatingArrangements
    );
    const suggestionsAreMade = seatingArrangementRecommender.makeSuggestion(showId, partyRequested);

    expect(suggestionsAreMade.partyRequested()).toEqual(partyRequested);
    expect(suggestionsAreMade.showId()).toEqual(showId);
    expect(suggestionsAreMade).toBeInstanceOf(SuggestionsAreAreNotAvailable);
  });

  test('suggest_two_seatingPlaces_when_Auditorium_contains_all_available_seatingPlaces', () => {
    const showId = '17';
    const partyRequested = 2;

    const auditoriumSeatingArrangements = new AuditoriumSeatingArrangements(
      new AuditoriumLayoutRepository(),
      new ReservationsProvider()
    );
    const seatingArrangementRecommender = new SeatingArrangementRecommender(
      auditoriumSeatingArrangements
    );
    const suggestionsAreMade = seatingArrangementRecommender.makeSuggestion(showId, partyRequested);

    expect(suggestionsAreMade.seatNames(PricingCategory.Second)).toEqual([
      'A1',
      'A2',
      'A9',
      'A10',
      'B1',
      'B2',
    ]);
  });

  test('suggest_three_availabilities_per_PricingCategory', () => {
    const showId = '18';
    const partyRequested = 1;

    const auditoriumSeatingArrangements = new AuditoriumSeatingArrangements(
      new AuditoriumLayoutRepository(),
      new ReservationsProvider()
    );
    const seatingArrangementRecommender = new SeatingArrangementRecommender(
      auditoriumSeatingArrangements
    );
    const suggestionsAreMade = seatingArrangementRecommender.makeSuggestion(showId, partyRequested);

    expect(suggestionsAreMade.seatNames(PricingCategory.First)).toEqual(['A3', 'A4', 'A5']);
    expect(suggestionsAreMade.seatNames(PricingCategory.Second)).toEqual(['A1', 'A2', 'A9']);
    expect(suggestionsAreMade.seatNames(PricingCategory.Third)).toEqual(['E1', 'E2', 'E3']);

    expect(suggestionsAreMade.seatNames(PricingCategory.Ignored)).toEqual(['A1', 'A2', 'A3']);
  });
});
