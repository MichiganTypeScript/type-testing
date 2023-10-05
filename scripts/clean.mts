import { rm } from 'fs/promises';
import { join } from 'path';

const path = join(process.cwd(), 'dist');

await rm(path, { recursive: true, force: true });