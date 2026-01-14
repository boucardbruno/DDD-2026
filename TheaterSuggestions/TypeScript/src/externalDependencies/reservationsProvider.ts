import * as fs from 'fs';
import * as path from 'path';
import { ReservedSeatsDto } from './dtos';

export class ReservationsProvider {
  private readonly repository: Map<string, ReservedSeatsDto> = new Map();

  constructor() {
    const jsonDirectory = path.join(process.cwd(), '..', '..', 'Stubs', 'AuditoriumLayouts');

    if (fs.existsSync(jsonDirectory)) {
      const files = fs.readdirSync(jsonDirectory);
      for (const file of files) {
        if (file.endsWith('_booked_seats.json')) {
          const filePath = path.join(jsonDirectory, file);
          const content = fs.readFileSync(filePath, 'utf-8');
          const reservedSeatsDto = JSON.parse(content) as ReservedSeatsDto;
          const showId = file.split('-')[0];
          this.repository.set(showId, reservedSeatsDto);
        }
      }
    }
  }

  public getReservedSeats(showId: string): ReservedSeatsDto {
    if (this.repository.has(showId)) {
      return this.repository.get(showId)!;
    }
    return { ReservedSeats: [] };
  }
}
