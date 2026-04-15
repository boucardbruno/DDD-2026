import { ReservationsProvider } from './reservationsProvider';
import { AuditoriumLayoutRepository } from './auditoriumLayoutRepository';

describe('ExternalDependencies', () => {
  test('should_allow_us_to_retrieve_reserved_seats_for_a_given_ShowId', () => {
    const seatsRepository = new ReservationsProvider();
    const reservedSeatsDto = seatsRepository.getReservedSeats('1');
    expect(reservedSeatsDto.ReservedSeats.length).toBe(19);
  });

  test('should_allow_us_to_retrieve_AuditoriumLayout_for_a_given_ShowId', () => {
    const eventRepository = new AuditoriumLayoutRepository();
    const theaterDto = eventRepository.findByShowId('2');

    expect(Object.keys(theaterDto.Rows).length).toBe(6);
    expect(theaterDto.Corridors.length).toBe(2);
    const firstSeatOfFirstRow = theaterDto.Rows['A'][0];
    expect(firstSeatOfFirstRow.Category).toBe(2);
  });
});
