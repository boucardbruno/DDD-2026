import { AuditoriumLayoutRepository } from '../external-dependencies/auditorium-layout-repository/auditorium-layout-repository';
import { ReservationsProvider } from '../external-dependencies/reservations-provider/reservations-provider';

describe('ExternalDependencies', () => {
  test('should allow us to retrieve reserved seats for a given ShowId', () => {
    const seatsRepository = new ReservationsProvider();
    const reservedSeatsDto = seatsRepository.getReservedSeats('1');
    expect(reservedSeatsDto.ReservedSeats.length).toBe(19);
  });

  test('should allow us to retrieve AuditoriumLayout for a given ShowId', () => {
    const eventRepository = new AuditoriumLayoutRepository();
    const theaterDto = eventRepository.findByShowId('2');

    expect(Object.keys(theaterDto.Rows).length).toBe(6);
    expect(theaterDto.Corridors.length).toBe(2);
    const firstSeatOfFirstRow = theaterDto.Rows['A'][0];
    expect(firstSeatOfFirstRow.Category).toBe(2);
  });
});
