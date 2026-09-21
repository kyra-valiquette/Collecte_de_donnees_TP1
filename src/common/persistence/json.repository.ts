import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'node:fs/promises';

@Injectable()
export class JsonRepository {
  private readonly filePath = process.env.DATA_FILE_PATH!;

  async readData() {
    const file = await readFile(this.filePath, 'utf-8');
    return JSON.parse(file);
  }

  async writeData(data: unknown) {
    await writeFile(
      this.filePath,
      JSON.stringify(data, null, 2),
      'utf-8',
    );
  }
}
