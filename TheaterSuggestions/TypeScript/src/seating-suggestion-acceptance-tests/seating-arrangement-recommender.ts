import { AuditoriumSeatingArrangements } from './auditorium-seating-arrangements';
import { SeatingPlace } from './seating-place';

export class SeatingArrangementRecommender {
  constructor(private readonly auditoriumSeatingArrangements: AuditoriumSeatingArrangements) {
    // TODO: Implement the constructor logic to initialize the recommender with the auditorium seating arrangements.
  }

  public makeSuggestion(showId: string, partyRequested: number): SeatingPlace[] {
    // TODO: Implement the logic to suggest seating arrangements based on the showId and partyRequested.
    return [];
  }
}
