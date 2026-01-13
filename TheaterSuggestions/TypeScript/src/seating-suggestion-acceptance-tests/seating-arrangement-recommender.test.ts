import { AuditoriumLayoutRepository } from '../external-dependencies/auditorium-layout-repository/auditorium-layout-repository';
import { ReservationsProvider } from '../external-dependencies/reservations-provider/reservations-provider';
import { AuditoriumSeatingArrangements } from './auditorium-seating-arrangements';
import { SeatingArrangementRecommender } from './seating-arrangement-recommender';

describe('SeatingArrangementRecommender', () => {
  /*
   *  Business Rule - Only Suggest available seats
   */
  test('suggest_one_seatingPlace_when_Auditorium_contains_one_available_seatingPlace', () => {
    // Ford Auditorium-1
    //       1   2   3   4   5   6   7   8   9  10
    //  A : (2) (2)  1  (1) (1) (1) (1) (1) (2) (2)
    //  B : (2) (2) (1) (1) (1) (1) (1) (1) (2) (2)
    const showId = '1';
    const partyRequested = 1;

    const auditoriumSeatingArrangements = new AuditoriumSeatingArrangements(
      new AuditoriumLayoutRepository(),
      new ReservationsProvider()
    );

    // Make this assertion real to the expected one with outcomes:
    const seatingArrangementRecommender = new SeatingArrangementRecommender(auditoriumSeatingArrangements);
    const seatingPlaces = seatingArrangementRecommender.makeSuggestion(showId, partyRequested);

    expect(seatingPlaces.map((sp) => sp.toString())).toEqual(['A3']);
  });

  test('return_SuggestionNotAvailable_when_Auditorium_has_all_its_seatingPlaces_reserved', () => {
    // Madison Auditorium-5
    //      1   2   3   4   5   6   7   8   9  10
    // A : (2) (2) (1) (1) (1) (1) (1) (1) (2) (2)
    // B : (2) (2) (1) (1) (1) (1) (1) (1) (2) (2)
    const showId = '5';
    const partyRequested = 1;

    const auditoriumSeatingArrangements = new AuditoriumSeatingArrangements(
      new AuditoriumLayoutRepository(),
      new ReservationsProvider()
    );

    // Make this assertion real to the expected one with outcomes: SuggestionNotAvailable
    const seatingArrangementRecommender = new SeatingArrangementRecommender(auditoriumSeatingArrangements);
    const suggestionsAreMade = seatingArrangementRecommender.makeSuggestion(showId, partyRequested);

    expect(suggestionsAreMade).toEqual([]);
  });
});
