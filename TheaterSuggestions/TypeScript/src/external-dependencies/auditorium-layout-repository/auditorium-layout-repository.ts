import * as fs from 'fs';
import * as path from 'path';
import { AuditoriumDto } from './auditorium-dto';

export class AuditoriumLayoutRepository {
  private readonly repository = new Map<string, AuditoriumDto>();

  constructor() {
    const jsonDirectory = path.join(__dirname, '../../../../../Stubs/AuditoriumLayouts');

    const files = fs.readdirSync(jsonDirectory);
    for (const file of files) {
      if (file.includes('_theater.json')) {
        const filePath = path.join(jsonDirectory, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const auditoriumDto: AuditoriumDto = JSON.parse(content);
        this.repository.set(file.split('-')[0], auditoriumDto);
      }
    }
  }

  public findByShowId(showId: string): AuditoriumDto {
    if (this.repository.has(showId)) {
      return this.repository.get(showId)!;
    }

    return { Rows: {}, Corridors: [] };
  }
}
